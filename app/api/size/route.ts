import prisma from "@/app/lib/connect";
import { authUser, getSortOrder, itemsPerPage } from "@/app/lib/utils";
import { sizePayload, updateSizePayload } from "@/app/lib/validators/size";

export async function POST(request: Request) {
  try {
    await authUser({ checkRole: "ADMIN" });
    const body = await request.json();

    const validatedPayload = sizePayload.safeParse(body);
    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }
    const { name } = validatedPayload.data;

    await prisma.size.create({
      data: {
        name: name,
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

    if (page === 0) {
      const data = await prisma.size.findMany({
        orderBy: { createdAt: order },
      });
      const count = data.length;
      if (!data) {
        return new Response(JSON.stringify("No data"), { status: 400 });
      }

      return new Response(JSON.stringify({ count, data }), { status: 200 });
    }

    const count = await prisma.size.count();
    const data = await prisma.size.findMany({
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

export async function PATCH(request: Request) {
  try {
    await authUser({ checkRole: "ADMIN" });

    const body = await request.json();

    const validatedPayload = updateSizePayload.safeParse(body);
    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    const { name, id } = validatedPayload.data;

    await prisma.size.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
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

    await prisma.size.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
