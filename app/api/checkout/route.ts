import prisma from "@/app/lib/connect";
import { stripe } from "@/app/lib/stripe";
import { authUser } from "@/app/lib/utils";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const { productIds } = await request.json();
    console.log("in the checkout", productIds);
    const { user } = await authUser({});
    if (!user || !user.id) {
      return new Response(JSON.stringify("Invalid User"), { status: 400 });
    }
    if (!productIds || productIds.length === 0) {
      return new Response(JSON.stringify("Product ids are required"), {
        status: 400,
      });
    }
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    products.forEach((product) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
      });
    });

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });
    console.log(order);

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `http://localhost:3000/${user.id}/cart?success=1`,
      cancel_url: `http://localhost:3000/${user.id}/cart?canceled=1`,
      metadata: {
        order: order.id,
      },
    });
    console.log("session is", session);

    return new Response(JSON.stringify({ url: session.url }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
