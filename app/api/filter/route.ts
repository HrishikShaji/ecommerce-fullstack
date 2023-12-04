import {
  authUser,
  getFilterObj,
  getSortOrder,
  itemsPerPage,
} from "@/app/lib/utils";
import prisma from "@/app/lib/connect";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const colorId = searchParams.getAll("colorId");
  const order = getSortOrder(request);
  const sizeId = searchParams.getAll("sizeId");
  const billboardId = searchParams.getAll("billboardId");
  const categoryId = searchParams.getAll("categoryId");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  console.log(minPrice, maxPrice);

  function getFilterRange({ min, max }: { min: string; max: string }) {
    let value = {};
    if (min && max) {
      value = {
        lte: Number(max),
        gte: Number(min),
      };
    } else {
      value = {
        lte: 10000,
        gte: 0,
      };
    }
    return value;
  }
  const priceObj = getFilterRange;
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
        colorId: getFilterObj(colorId),
        sizeId: getFilterObj(sizeId),
        billoardId: getFilterObj(billboardId),
        categoryId: getFilterObj(categoryId),
        price: priceObj,
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
