import { authUser } from "@/app/lib/utils";
import prisma from "@/app/lib/connect";

type Params = {
  params: {
    productId: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { productId } = params;
    console.log("its here ", params);
    await authUser({});

    const count = await prisma.product.count();
    const data = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        store: true,
        category: true,
        size: true,
        color: true,
        billboard: true,
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
