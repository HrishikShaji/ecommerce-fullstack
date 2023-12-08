"use client";
import { useAddQuery } from "@/app/hooks/useAddQuery";
import { useGetQuery } from "@/app/hooks/useGetQuery";
import { cartItemPayload } from "@/app/lib/validators/cartItem";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const { productId } = useParams();
  const { data, refetch, isError, isLoading, isSuccess } = useGetQuery({
    endpoint: `product/${productId}`,
    queryKey: "product",
    page: 1,
    sort: "LATEST",
  });

  const { isPending, add } = useAddQuery({
    endpoint: `${session?.user.id}/cart`,
    queryKey: "cart",
    reset: () => {},
  });

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleClick = () => {
    const validatedData = cartItemPayload.safeParse({ productId: data.id });
    if (!validatedData.success) {
      throw new Error("error");
      return;
    }
    add(validatedData.data);
  };
  return (
    <div className="text-white p-20">
      <div className="flex flex-col gap-2">
        <Image
          src={data.images[0]}
          alt="image"
          height={1000}
          width={1000}
          className="h-40 w-40 object-cover rounded-md"
        />
        <h1 className="text-xl">{data.name}</h1>
        <h1>{data.price}$</h1>
        <button
          onClick={handleClick}
          className="px-3 py-2 rounded-md bg-white text-black"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Page;
