import {
  authUser,
  getFilterObj,
  getFilterRange,
  getFilterSortOrder,
  getSortOrder,
  itemsPerPage,
  paginateArray,
} from "@/app/lib/utils";
import prisma from "@/app/lib/connect";
import { SortType } from "@/types/types";

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
  const sort = searchParams.get("sort") as SortType;
  const search = searchParams.get("searchString");
  const brandId = searchParams.getAll("brandId");
  console.log("prices", minPrice, maxPrice);
  try {
    await authUser({});
    const count = await prisma.product.count();
    const data = await prisma.product.findMany({
      include: {
        store: true,
        category: true,
        size: true,
        color: true,
        billboard: true,
      },
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
      orderBy: {
        createdAt: getFilterSortOrder(sort),
      },
      where: {
        colorId: getFilterObj(colorId),
        sizeId: getFilterObj(sizeId),
        billoardId: getFilterObj(billboardId),
        categoryId: getFilterObj(categoryId),
        price: getFilterRange({ min: minPrice, max: maxPrice }),
        brandId: getFilterObj(brandId),
      },
    });
    if (!data) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    const results = data.filter((result) => {
      return result.name.toLowerCase().includes(search ? search : "");
    });
    const searchCount = results.length;
    const searchResults = paginateArray({ array: results, page: page });
    return new Response(
      JSON.stringify({ count: searchCount, data: searchResults }),
      {
        status: 200,
      },
    );
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
