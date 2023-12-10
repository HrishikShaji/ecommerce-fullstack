import prisma from "@/app/lib/connect";
import { getSortOrder, paginateArray, validateUrl } from "@/app/lib/utils";
import { getCategories } from "../category/route";
import { searchUrlSchema } from "@/app/lib/validators/search";

export async function GET(request: Request) {
  const { page, section, searchString, sort } = validateUrl({
    request: request,
    params: ["page", "section", "searchString", "sort"],
    schema: searchUrlSchema,
  });
  const order = getSortOrder(request);
  try {
    let results: any[] = [];
    if (section === "billBoard") {
      results = await prisma.billBoard.findMany({
        orderBy: { createdAt: order },
      });
    }
    if (section === "category") {
      const allResults = await prisma.category.findMany({
        orderBy: { createdAt: order },
      });
      results = getCategories(allResults);
    }
    if (section === "product") {
      results = await prisma.product.findMany({
        include: {
          category: true,
          billboard: true,
          store: true,
          size: true,
          color: true,
        },
        orderBy: {
          createdAt: order,
        },
      });
    }
    if (section === "color") {
      results = await prisma.color.findMany({ orderBy: { createdAt: order } });
    }
    if (section === "size") {
      results = await prisma.size.findMany({ orderBy: { createdAt: order } });
    }

    if (!results) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    const allResults = results.filter((result) => {
      return result.name.toLowerCase().includes(searchString);
    });
    const count = allResults.length;
    const searchResults = paginateArray({ array: allResults, page: page });

    return new Response(JSON.stringify({ count, searchResults }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
