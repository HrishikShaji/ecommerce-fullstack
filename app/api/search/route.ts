import prisma from "@/app/lib/connect";
import { itemsPerPage } from "@/app/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const section = searchParams.get("section");
  const searchString = searchParams.get("searchString");
  console.log(page, section, searchString);
  try {
    if (page === 0) {
      let results: any[] = [];
      if (section === "billBoard") {
        results = await prisma.billBoard.findMany({});
      }
      if (section === "billBoard") {
        results = await prisma.category.findMany({});
      }
      if (section === "billBoard") {
        results = await prisma.product.findMany({});
      }
      if (section === "billBoard") {
        results = await prisma.color.findMany({});
      }
      if (section === "billBoard") {
        results = await prisma.size.findMany({});
      }

      if (!results) {
        return new Response(JSON.stringify("No data"), { status: 400 });
      }
      return new Response(JSON.stringify(results), { status: 200 });
    }

    let results: any[] = [];
    let count;
    if (section === "billBoard") {
      count = await prisma.billBoard.count();
      results = await prisma.billBoard.findMany({});
    }
    if (section === "category") {
      count = await prisma.category.count();
      results = await prisma.category.findMany({});
    }
    if (section === "product") {
      count = await prisma.product.count();
      results = await prisma.product.findMany({});
    }
    if (section === "color") {
      count = await prisma.color.count();
      results = await prisma.color.findMany({});
    }
    if (section === "size") {
      count = await prisma.size.count();
      results = await prisma.size.findMany({});
    }

    if (!results) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    const searchResults = results.filter((result) => {
      return result.name.toLowerCase().includes(searchString);
    });
    return new Response(JSON.stringify({ count, searchResults }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
