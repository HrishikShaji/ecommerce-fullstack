"use client";
import { useGetQuery } from "@/app/hooks/useGetQuery";
import Image from "next/image";
import { useParams } from "next/navigation";

const Page = () => {
  const { productId } = useParams();
  const { data, refetch, isError, isLoading, isSuccess } = useGetQuery({
    endpoint: `product/${productId}`,
    queryKey: "product",
    page: 1,
    sort: "LATEST",
  });

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
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
      </div>
    </div>
  );
};

export default Page;
