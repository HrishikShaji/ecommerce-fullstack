"use client";

import { useGetQuery } from "@/app/hooks/useGetQuery";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { userId } = useParams();
  const { data, isError, isLoading, isSuccess } = useGetQuery({
    endpoint: `${userId}/cart`,
    queryKey: "cart",
    page: 1,
    sort: "LATEST",
  });

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className="text-white">
      {data.cartItems.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <Image
            src={item.product.images[0]}
            alt="image"
            height={1000}
            width={1000}
            className="h-40 w-40 rounded-md object-cover"
          />
          <div>
            <h1>{item.product.name}</h1>
            <h1>{item.product.price}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
