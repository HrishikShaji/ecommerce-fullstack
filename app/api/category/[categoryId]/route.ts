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
    console.log("its here ", params);
    await authUser({});

    const count = await prisma.category.count();
    const data = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    console.log(data);

    if (!data) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    return new Response(JSON.stringify({ count, data }), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
