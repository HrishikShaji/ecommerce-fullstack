"use client";

import { ProductChild } from "@/types/types";
import { Spinner } from "../components/ui/Spinner";
import { useGetQuery } from "../hooks/useGetQuery";

const Page = () => {
  const { data, isError, isLoading, error, refetch } = useGetQuery({
    endpoint: "product",
    queryKey: "products",
    page: 1,
    sort: "LATEST",
  });
  console.log(data);
  if (isError) return <div>Error</div>;
  if (isLoading) return <Spinner />;
  return (
    <div className="w-full min-h-screen p-10 grid grid-cols-3 gap-4">
      {data.map((item: ProductChild) => (
        <div key={item.id} className="p-2 bg-neutral-600 rounded-md">
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Page;
