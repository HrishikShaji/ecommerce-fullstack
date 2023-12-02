import { authUser, getSortOrder, itemsPerPage } from "@/app/lib/utils";
import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const colorId = Array(searchParams.get("colorId"));
  const order = getSortOrder(request);
  const sizeId = searchParams.get("sizeId");
  const billboardId = searchParams.get("billboardId");
  const categoryId = searchParams.get("categoryId");

  try {
    await authUser({});
    const queryObj: any = {};
    if (colorId) queryObj.colorId = colorId;
    if (sizeId) queryObj.sizeId = sizeId;
    if (billboardId) queryObj.billoardId = billboardId;
    if (categoryId) queryObj.categoryId = categoryId;
    console.log("colors are", colorId, colorId[0]);
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
        OR: [
          {
            colorId: colorId[0],
          },
          {
            colorId: colorId[1],
          },
        ],
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
