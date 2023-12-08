import { authUser } from "@/app/lib/utils";
import prisma from "@/app/lib/connect";

type Params = {
  params: {
    userId: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    console.log("its here", params.userId);
    await authUser({});
    if (!params.userId) {
      return new Response(JSON.stringify("Invalid Id"), { status: 400 });
    }
    const count = await prisma.cart.count();
    const data = await prisma.cart.findFirst({
      where: {
        userId: params.userId,
      },
    });
    console.log(data);
    if (!data) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    return new Response(JSON.stringify({ count, data }), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
