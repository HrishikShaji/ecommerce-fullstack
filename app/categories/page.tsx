"use client";

import { useGetQuery } from "../hooks/useGetQuery";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const { data, isError, isLoading } = useGetQuery({
    endpoint: `category/${categoryId}`,
    page: 1,
    sort: "LATEST",
    queryKeys: ["categories", categoryId as string],
  });

  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("subcats are", data);
  return (
    <div className="p-10 text-white">
      {data.map((category: any) => (
        <Link
          key={category.category.id}
          href={
            category.subCategories.length === 0
              ? `/products?categoryId=${category.category.id}`
              : `/categories?categoryId=${category.category.id}`
          }
          className="flex flex-col gap-2 items-center"
        >
          <Image
            height={1000}
            width={1000}
            alt="image"
            className="h-60 w-60 rounded-md"
            src={category.category.images[0]}
          />
          <h1>{category.category.name}</h1>
        </Link>
      ))}
    </div>
  );
};

export default Page;
