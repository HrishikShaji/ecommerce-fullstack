"use client";

import { CategoryChild } from "@/types/types";
import { useGetQuery } from "../hooks/useGetQuery";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Category } from "@prisma/client";

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
      {data.map((category: Category) => (
        <Link
          key={category.id}
          href={`/categories?categoryId=${category.id}`}
          className="flex flex-col gap-2 items-center"
        >
          <Image
            height={1000}
            width={1000}
            alt="image"
            className="h-60 w-60 rounded-md"
            src={category.images[0]}
          />
          <h1>{category.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Page;
