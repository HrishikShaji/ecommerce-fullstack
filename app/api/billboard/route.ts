import { authUser, getSortOrder, itemsPerPage } from "@/app/lib/utils";
import prisma from "@/app/lib/connect";

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
