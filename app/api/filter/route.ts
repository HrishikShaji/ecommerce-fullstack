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

  function getFilterObj(values: string[]) {
    return values.length === 0 ? {} : { in: values };
  }
  const colorObj = getFilterObj(colorId);
  const sizeObj = getFilterObj(sizeId);
  const billboardObj = getFilterObj(billboardId);
  const categoryObj = getFilterObj(categoryId);
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
