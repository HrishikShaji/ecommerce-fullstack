import prisma from "@/app/lib/connect";
import { authUser } from "@/app/lib/utils";

type Params = {
  params: {
    categoryId: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { categoryId } = params;
    await authUser({});

    const count = await prisma.category.count();
    const data = await prisma.category.findMany({
      where: {
        parentId: categoryId,
      },
      include: {
        products: true,
      },
    });
    const getSubCategories = data.map(async (category) => {
      const subCategories = await prisma.category.findMany({
        where: {
          parentId: category.id,
        },
      });
      return { category, subCategories };
    });

    const subCategories = await Promise.all(getSubCategories);

    if (!data) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    return new Response(JSON.stringify({ count, data: subCategories }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
