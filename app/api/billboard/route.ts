import { authOptions } from "@/app/lib/auth";
import { Session, getServerSession } from "next-auth";
import prisma from "@/app/lib/connect";
import { itemsPerPage } from "@/app/lib/utils";
import { SortType } from "@/app/components/SectionContainer";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const user = (await getServerSession(authOptions)) as Session;

    if (!name) {
      return new Response(JSON.stringify("Wrong input"), { status: 400 });
    }
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }

    const billboard = await prisma.billBoard.create({
      data: {
        name: name,
        userId: user.user.id,
      },
    });

    return new Response(JSON.stringify(billboard), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const sort = searchParams.get("sort");
  console.log(sort, "in the backend");
  const order = sort === "LATEST" ? "desc" : "asc";
  try {
    if (page === 0) {
      const billboards = await prisma.billBoard.findMany({});

      if (!billboards) {
        return new Response(JSON.stringify("No data"), { status: 400 });
      }
      return new Response(JSON.stringify(billboards), { status: 200 });
    }

    const count = await prisma.billBoard.count();
    const billboards = await prisma.billBoard.findMany({
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
      orderBy: { createdAt: order },
    });

    if (!billboards) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    return new Response(JSON.stringify({ count, billboards }), { status: 200 });
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
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { name, id } = await request.json();

    const user = (await getServerSession(authOptions)) as Session;

    if (!name) {
      return new Response(JSON.stringify("Wrong input"), { status: 400 });
    }
    if (!id) {
      return new Response(JSON.stringify("wrong input"), { status: 200 });
    }
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }

    const billboard = await prisma.billBoard.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    return new Response(JSON.stringify(billboard), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
