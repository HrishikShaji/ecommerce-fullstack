"use client";
import { useGetQuery } from "@/app/hooks/useGetQuery";
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
      <h1>Product {productId}</h1>
    </div>
  );
};

export default Page;
