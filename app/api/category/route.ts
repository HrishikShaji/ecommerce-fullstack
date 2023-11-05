import { authOptions } from "@/app/lib/auth";
import { Session, getServerSession } from "next-auth";
import prisma from "@/app/lib/connect";
import { Category } from "@prisma/client";
import { CategoryChild } from "@/types/types";

export async function POST(request: Request) {
  try {
    const { name, parentId } = await request.json();

    const user = (await getServerSession(authOptions)) as Session;

    if (!name) {
      return new Response(JSON.stringify("Wrong input"), { status: 400 });
    }
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }
    if (parentId) {
      const category = await prisma.category.create({
        data: {
          name: name,
          parentId: parentId,
        },
      });
      return new Response(JSON.stringify(category), { status: 200 });
    }

    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

const getCategories = (
  categories: Category[],
  parentId: string | null = null,
) => {
  let categoryList: CategoryChild[] = [];

  let category;

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == null);
  } else {
    category = categories.filter((cat) => cat.parentId === parentId);
  }

  for (let cat of category) {
    categoryList.push({
      id: cat.id,
      name: cat.name,
      parentId: cat.parentId,
      children: getCategories(categories, cat.id),
    });
  }
  return categoryList;
};

export async function GET(request: Request) {
  try {
    const categories = await prisma.category.findMany({});

    if (!categories) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    const allCategories = getCategories(categories);

    return new Response(JSON.stringify(allCategories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify("wrong input"), { status: 400 });
    }
    const user = (await getServerSession(authOptions)) as Session;
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }

    await prisma.category.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
