import prisma from "@/app/lib/connect";
import { authUser, getSortOrder, itemsPerPage } from "@/app/lib/utils";
import {
  productPayload,
  updateProductPayload,
} from "@/app/lib/validators/Product";

type Params = {
  params: {
    userId: string;
    storeId: string;
  };
};

export async function POST(request: Request, { params }: Params) {
  try {
    await authUser({ checkRole: "SELLER" });

    const body = await request.json();

    const validatedPayload = productPayload.safeParse(body);
    console.log(body);
    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    const { name, categoryId, billboardId, brandId, slug } =
      validatedPayload.data;

    await prisma.product.create({
      data: {
        name: name,
        categoryId: categoryId,
        storeId: params.storeId,
        billoardId: billboardId,
        brandId: brandId,
        slug: slug,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await authUser({ checkRole: "SELLER" });

    const body = await request.json();

    const validatedPayload = updateProductPayload.safeParse(body);

    if (!validatedPayload.success) {
      return new Response(JSON.stringify("Invalid Input"), { status: 400 });
    }

    const { name, categoryId, billboardId, id, brandId, slug } =
      validatedPayload.data;
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        categoryId: categoryId,
        billoardId: billboardId,
        brandId: brandId,
        slug: slug,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page"));
  const order = getSortOrder(request);
  try {
    await authUser({});

    const count = await prisma.product.count();
    const data = await prisma.product.findMany({
      include: {
        store: true,
        category: true,
        billboard: true,
      },
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
      orderBy: {
        createdAt: order,
      },
    });

    if (!data) {
      return new Response(JSON.stringify("No data"), { status: 400 });
    }
    return new Response(JSON.stringify({ count, data }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await authUser({ checkRole: "SELLER" });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify("wrong input"), { status: 400 });
    }

    await prisma.product.delete({
      where: {
        id: id,
      },
    });

    return new Response(JSON.stringify("success"), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
}
