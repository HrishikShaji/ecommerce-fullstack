"use client";

import { useGetQuery } from "@/app/hooks/useGetQuery";
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
  return <div className="text-white">Cart</div>;
};

export default Page;
