import prisma from "@/app/lib/connect";
import { itemsPerPage, paginateArray } from "@/app/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const section = searchParams.get("section");
  const searchString = searchParams.get("searchString");
  try {
    let results: any[] = [];
    if (section === "billBoard") {
      results = await prisma.billBoard.findMany({});
    }
    if (section === "category") {
      results = await prisma.category.findMany({});
    }
    if (section === "product") {
      results = await prisma.product.findMany({});
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
