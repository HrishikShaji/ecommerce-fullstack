import { authUser } from "@/app/lib/utils";
import prisma from "@/app/lib/connect";
import { storePayload } from "@/app/lib/validators/store";

type Params = {
  params: {
    userId: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { user } = await authUser({ checkRole: "SELLER" });
    if (params.userId !== user.id) {
      return new Response(JSON.stringify("Invalid User"), { status: 403 });
    }
    const count = await prisma.store.count();
    const data = await prisma.store.findMany({
      where: {
        userId: user.id,
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

export async function POST(request: Request, { params }: Params) {
  try {
    const { user } = await authUser({ checkRole: "SELLER" });
    if (params.userId !== user.id) {
      return new Response(JSON.stringify("Invalid User"), { status: 403 });
    }
    const body = await request.json();

    const validatedPayload = storePayload.safeParse(body);

    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    const { name } = validatedPayload.data;
    await prisma.store.create({
      data: {
        name: name,
        userId: user.id,
      },
    });

    return new Response(JSON.stringify({ data: "store created" }), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
