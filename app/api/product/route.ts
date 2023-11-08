import { authOptions } from "@/app/lib/auth";
import { Session, getServerSession } from "next-auth";
import prisma from "@/app/lib/connect";

export async function POST(request: Request) {
  try {
    const { name, categoryId } = await request.json();

    const user = (await getServerSession(authOptions)) as Session;

    if (!name) {
      return new Response(JSON.stringify("Wrong input"), { status: 400 });
    }
    if (!categoryId) {
      return new Response(JSON.stringify("wrong input"), { status: 200 });
    }
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }

    const product = await prisma.product.create({
      data: {
        name: name,
        categoryId: categoryId,
        userId: user.user.id,
      },
    });

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    console.log("its here");
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    if (!products) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    console.log(products);
    return new Response(JSON.stringify(products), { status: 200 });
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

    await prisma.product.delete({
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
