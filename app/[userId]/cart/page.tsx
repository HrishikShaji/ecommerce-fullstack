"use client";

import { useAddQuery } from "@/app/hooks/useAddQuery";
import { useDeleteQuery } from "@/app/hooks/useDeleteQuery";
import { useGetQuery } from "@/app/hooks/useGetQuery";
import { Product } from "@prisma/client";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const { userId } = useParams();
  const router = useRouter();
  const { data, isError, isLoading, isSuccess } = useGetQuery({
    endpoint: `${userId}/cart`,
    queryKey: "cart",
    page: 1,
    sort: "LATEST",
  });

  const {
    remove,
    isDeleting,
    isError: deleteError,
  } = useDeleteQuery({
    endpoint: `${userId}/cart`,
    queryKey: "cart",
  });

  const {
    add,
    isPending,
    isError: isAddError,
  } = useAddQuery({
    endpoint: "checkout",
    queryKey: "product",
    reset: () => {},
  });

  const handleBuy = async (productIds: string[]) => {
    console.log(productIds);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productIds }),
      });

      const data = await response.json();
      router.push(data.url);
    } catch (error) {
      console.error(error);
    }
  };

  if (isError) return <div>Error</div>;
  if (deleteError) return <div>Delete Error</div>;
  if (isAddError) return <div>Add Error</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isPending) return <div>Loading...</div>;
  return (
    <div className="text-white p-10">
      <div className="flex flex-col gap-4">
        {data.cartItems.map((item: any) => (
          <div
            key={item.id}
            className="flex rounded-md bg-neutral-700 p-2 flex-col gap-2 "
          >
            <div className="flex gap-2 w-full items-center justify-between">
              <div className="flex gap-2">
                <Image
                  src={item.product.images[0]}
                  alt="image"
                  height={1000}
                  width={1000}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div>
                  <h1>{item.product.name}</h1>
                  <h1>{item.product.price}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => remove(item.id)}
                  className="px-2 py-1 rounded-md bg-white text-black"
                >
                  {isDeleting ? "Deleting" : "Remove"}
                </button>
                <button
                  onClick={() => handleBuy([item.product.id])}
                  className="px-2 py-1 rounded-md bg-white text-black"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
