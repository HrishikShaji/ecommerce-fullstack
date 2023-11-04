import { authOptions } from "@/app/lib/auth";
import { Session, getServerSession } from "next-auth";
import prisma from "@/app/lib/connect";

export async function POST(request: Request, response: Response) {
  try {
    const { name } = await request.json();

    const user = (await getServerSession(authOptions)) as Session;

    if (!name) {
      return new Response(JSON.stringify("Wrong input"), { status: 400 });
    }
    if (user.user.role !== "ADMIN") {
      return new Response(JSON.stringify("unauthorized"), { status: 401 });
    }

    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    console.log(category);

    return new Response(JSON.stringify(category), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}

export async function GET(request: Request, response: Response) {
  try {
    console.log("request is here");
    const user = (await getServerSession(authOptions)) as Session;
    console.log("user is", user);

    const categories = await prisma.category.findMany({});
    console.log("categories are", categories);
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
