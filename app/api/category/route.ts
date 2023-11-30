import { authOptions } from "@/app/lib/auth";
import { Session, getServerSession } from "next-auth";
import prisma from "@/app/lib/connect";
import { Category } from "@prisma/client";
import { CategoryChild } from "@/types/types";
import { getSortOrder, itemsPerPage, paginateArray } from "@/app/lib/utils";
import {
  categoryPayload,
  updateCategoryPayload,
} from "@/app/lib/validators/category";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validatedPayload = categoryPayload.safeParse(payload);
    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), {
        status: 400,
      });
    }
    const user = (await getServerSession(authOptions)) as Session;
    if (!user) {
      return new Response(JSON.stringify("Login Required"), { status: 401 });
    }

    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("Admin Privilege Required"), {
        status: 401,
      });
    }
    const { name, parentId } = validatedPayload.data;
    if (validatedPayload.data.parentId) {
      const category = await prisma.category.create({
        data: {
          name: name,
          parentId: parentId,
          userId: user.user.id,
        },
      });
      return new Response(JSON.stringify(category), { status: 200 });
    }

    const category = await prisma.category.create({
      data: {
        name: name,
        userId: user.user.id,
      },
    });

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}

export const getCategories = (
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
      userId: cat.userId,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
      children: getCategories(categories, cat.id),
    });
  }
  return categoryList;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const order = getSortOrder(request);
  try {
    if (page === 0) {
      const categories = await prisma.category.findMany({
        orderBy: { createdAt: order },
      });

      if (!categories) {
        return new Response(JSON.stringify("No data"), { status: 400 });
      }
      const data = getCategories(categories);
      const count = data.length;
      return new Response(JSON.stringify({ count, data }), {
        status: 200,
      });
    }

    const categories = await prisma.category.findMany({
      orderBy: { createdAt: order },
    });

    if (!categories) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    const withSubCategories = getCategories(categories);
    const count = withSubCategories.length;
    const data = paginateArray({
      array: withSubCategories,
      page: page,
    });
    return new Response(JSON.stringify({ count, data }), {
      status: 200,
    });
  } catch (error) {
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
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const user = (await getServerSession(authOptions)) as Session;
    const validatedPayload = updateCategoryPayload.safeParse(body);
    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }
    const { id, name } = validatedPayload.data;
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
