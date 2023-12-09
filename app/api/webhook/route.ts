import { stripe } from "@/app/lib/stripe";
import Stripe from "stripe";
import prisma from "@/app/lib/connect";

const endpointSecret =
  "whsec_80ad9b73b7f2cfa7f73df52c6357d79130ac15b3a5e4e5db8f11cd8ff6d2f0bf";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  if (!signature) {
    return new Response(JSON.stringify("Invalid sig"), { status: 400 });
  }

  if (!body) {
    return new Response(JSON.stringify("Invalid body"), { status: 400 });
  }
  try {
    let event;
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);

    const session = event.data.object as Stripe.Checkout.Session;
    if (!session.metadata) {
      return new Response(JSON.stringify("Invalid metadata"), { status: 400 });
    }
    if (event.type === "checkout.session.completed") {
      const order = await prisma.order.update({
        where: {
          id: session.metadata.order,
        },
        data: {
          isPaid: true,
        },
        include: {
          orderItems: true,
        },
      });
      console.log("order updated", order);
    }
    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    console.log("errroro", error);
    return new Response(JSON.stringify("Invalid Input"), { status: 400 });
  }
}
