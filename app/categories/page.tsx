"use client";

import { CategoryChild } from "@/types/types";
import { useGetQuery } from "../hooks/useGetQuery";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const { data, isError, isLoading } = useGetQuery({
    endpoint: `category/${categoryId}`,
    page: 1,
    sort: "LATEST",
    queryKey: "categories",
  });

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return (
    <div className="p-10 text-white">
      {data.map((category: CategoryChild) => (
        <Link key={category.id} href={`/categories?categoryId=${category.id}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default Page;
