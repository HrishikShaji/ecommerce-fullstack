import prisma from "@/app/lib/connect";
import { stripe } from "@/app/lib/stripe";
import { authUser } from "@/app/lib/utils";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type,Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { productIds } = await req.json();
  console.log("in the checkout", productIds);
  const { user } = await authUser({});
  if (!user || !user.id) {
    return new NextResponse("user Ids are required", {
      status: 400,
    });
  }
  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product Ids are required", {
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

  return NextResponse.json({ url: session.url }, { headers: corsHeaders });
}
