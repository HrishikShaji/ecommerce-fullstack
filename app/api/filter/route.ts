import {
  authUser,
  getFilterObj,
  getFilterRange,
  getFilterSortOrder,
  itemsPerPage,
  paginateArray,
} from "@/app/lib/utils";
import prisma from "@/app/lib/connect";
import { SortType } from "@/types/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const colorId = searchParams.getAll("colorId");
  const sizeId = searchParams.getAll("sizeId");
  const billboardId = searchParams.getAll("billboardId");
  const categoryId = searchParams.getAll("categoryId");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort") as SortType;
  const search = searchParams.get("searchString");
  const brandId = searchParams.getAll("brandId");
  const discount = Number(searchParams.get("discountId"));

  console.log("filter here", categoryId);
  try {
    await authUser({});
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
        ...(discount && { discount: discount }),
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
    console.log("data is", searchResults);
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
