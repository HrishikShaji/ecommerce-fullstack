import prisma from "@/app/lib/connect";
import { itemsPerPage, paginateArray } from "@/app/lib/utils";
import { getCategories } from "../category/route";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const section = searchParams.get("section");
  const searchString = searchParams.get("searchString");
  console.log("searchPage is", page);
  try {
    let results: any[] = [];
    if (section === "billBoard") {
      results = await prisma.billBoard.findMany({});
    }
    if (section === "category") {
      const allResults = await prisma.category.findMany({});
      results = getCategories(allResults);
    }
    if (section === "product") {
      results = await prisma.product.findMany({
        include: {
          category: true,
          billboard: true,
          user: true,
          size: true,
          color: true,
        },
      });
    }
    if (section === "color") {
      results = await prisma.color.findMany({});
    }
    if (section === "size") {
      results = await prisma.size.findMany({});
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
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
