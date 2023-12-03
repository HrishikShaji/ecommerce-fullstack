import { authUser, getSortOrder, itemsPerPage } from "@/app/lib/utils";
import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const colorId = searchParams.getAll("colorId");
  const order = getSortOrder(request);
  const sizeId = searchParams.getAll("sizeId");
  const billboardId = searchParams.getAll("billboardId");
  const categoryId = searchParams.getAll("categoryId");
  const colorObj =
    colorId.length === 0
      ? {}
      : {
          in: colorId,
        };
  const sizeObj =
    sizeId.length === 0
      ? {}
      : {
          in: sizeId,
        };
  const billboardObj =
    billboardId.length === 0
      ? {}
      : {
          in: billboardId,
        };
  const categoryObj =
    categoryId.length === 0
      ? {}
      : {
          in: categoryId,
        };
  console.log(
    "colors are:",
    colorId,
    "sizes are:",
    sizeId,
    "billboards are:",
    billboardId,
    "categories are:",
    categoryId,
  );
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
      where: {
        colorId: colorObj,
        sizeId: sizeObj,
        billoardId: billboardObj,
        categoryId: categoryObj,
      },
    });

    if (!data) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    return new Response(JSON.stringify({ count, data }), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
