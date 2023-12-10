import prisma from "@/app/lib/connect";
import { authUser, getSortOrder, itemsPerPage } from "@/app/lib/utils";
import {
  billboardPayload,
  updateBillboardPayload,
} from "@/app/lib/validators/Billboard";

type Params = {
  params: {
    userId: string;
    storeId: string;
  };
};

export async function POST(request: Request, { params }: Params) {
  try {
    const { user } = await authUser({ checkRole: "SELLER" });

    if (user.id !== params.userId) {
      return new Response(JSON.stringify("Invalid User"), { status: 400 });
    }
    const body = await request.json();

    const validatedPayload = billboardPayload.safeParse(body);

    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    const { name, images } = validatedPayload.data;

    await prisma.billBoard.create({
      data: {
        name: name,
        storeId: params.storeId,
        images: images,
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
      const data = await prisma.billBoard.findMany({});
      const count = data.length;
      if (!data) {
        return new Response(JSON.stringify("No data"), { status: 400 });
      }
      return new Response(JSON.stringify({ count, data }), { status: 200 });
    }

    const count = await prisma.billBoard.count();
    const data = await prisma.billBoard.findMany({
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
      orderBy: { createdAt: order },
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
    await authUser({ checkRole: "SELLER" });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify("wrong input"), { status: 400 });
    }
    await prisma.billBoard.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await authUser({ checkRole: "SELLER" });

    const body = await request.json();

    const validatedPayload = updateBillboardPayload.safeParse(body);
    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 200 });
    }
    const { id, name, images } = validatedPayload.data;

    await prisma.billBoard.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        images: images,
      },
    });
    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
