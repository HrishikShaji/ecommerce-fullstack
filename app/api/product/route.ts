import { authOptions } from "@/app/lib/auth";
import { Session, getServerSession } from "next-auth";
import prisma from "@/app/lib/connect";
import { authUser, getSortOrder, itemsPerPage } from "@/app/lib/utils";
import {
  productPayload,
  updateProductPayload,
} from "@/app/lib/validators/Product";

export async function POST(request: Request) {
  try {
    const user = await authUser({ checkRole: "ADMIN" });

    const body = await request.json();

    const validatedPayload = productPayload.safeParse(body);

    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    const { name, categoryId, billboardId, sizeId, colorId } =
      validatedPayload.data;

    await prisma.product.create({
      data: {
        name: name,
        categoryId: categoryId,
        userId: user.user.id,
        billoardId: billboardId,
        sizeId: sizeId,
        colorId: colorId,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await authUser({ checkRole: "ADMIN" });

    const body = await request.json();

    const validatedPayload = updateProductPayload.safeParse(body);

    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    const { name, categoryId, billboardId, sizeId, colorId, id } =
      validatedPayload.data;
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        categoryId: categoryId,
        billoardId: billboardId,
        colorId: colorId,
        sizeId: sizeId,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const order = getSortOrder(request);
  try {
    await authUser({});

    const count = await prisma.product.count();
    const data = await prisma.product.findMany({
      include: {
        user: true,
        category: true,
        size: true,
        color: true,
        billboard: true,
      },
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
      orderBy: {
        createdAt: order,
      },
    });

    if (!data) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    return new Response(JSON.stringify({ count, data }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await authUser({ checkRole: "ADMIN" });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify("wrong input"), { status: 400 });
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
