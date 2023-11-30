import { authOptions } from "@/app/lib/auth";
import { Session, getServerSession } from "next-auth";
import prisma from "@/app/lib/connect";
import { getSortOrder, itemsPerPage } from "@/app/lib/utils";
import {
  billboardPayload,
  updateBillboardPayload,
} from "@/app/lib/validators/Billboard";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = (await getServerSession(authOptions)) as Session;
    const validatedPayload = billboardPayload.safeParse(body);

    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }

    const { name, images } = validatedPayload.data;

    const billboard = await prisma.billBoard.create({
      data: {
        name: name,
        userId: user.user.id,
        images: images,
      },
    });

    return new Response(JSON.stringify(billboard), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const order = getSortOrder(request);
  try {
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

    await prisma.billBoard.delete({
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

    const validatedPayload = updateBillboardPayload.safeParse(body);
    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 200 });
    }
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }
    const { id, name, images } = validatedPayload.data;

    const billboard = await prisma.billBoard.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        images: images,
      },
    });
    return new Response(JSON.stringify(billboard), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
