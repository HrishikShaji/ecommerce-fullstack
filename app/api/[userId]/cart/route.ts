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
    const count = await prisma.cart.count();
    const data = await prisma.cart.findFirst({
      where: {
        userId: params.userId,
      },
      include: {
        cartItems: {
          include: {
            product: true,
            cart: true,
          },
        },
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

export async function POST(request: Request) {
  try {
    const { user } = await authUser({});
    const { productId } = await request.json();

    if (!productId) {
      return new Response(JSON.stringify("Invalid product id"), {
        status: 400,
      });
    }
    const userCart = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        cart: true,
      },
    });

    if (userCart === null || userCart.cart === null) {
      return new Response(JSON.stringify("no cart"), { status: 400 });
    }
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: userCart.cart.id,
        productId: productId,
      },
    });

    console.log("its here cart", productId, cartItem);

    return new Response(JSON.stringify({ data: cartItem }), { status: 200 });
  } catch (error: any) {
    console.log(error);
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await authUser({});

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    console.log("delete cartItem", id);
    if (!id) {
      return new Response(JSON.stringify("wrong input"), { status: 400 });
    }
    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
