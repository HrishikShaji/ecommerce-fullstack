import Link from "next/link";
import { useGetQuery } from "../hooks/useGetQuery";
import { CategoryChild } from "@/types/types";
import Image from "next/image";

export const CategoryTiles = () => {
  const { data, isError, isLoading } = useGetQuery({
    endpoint: "category",
    queryKey: "categories",
    page: 1,
    sort: "LATEST",
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="flex gap-2">
      {data.map((item: CategoryChild) => (
        <Link
          href={`/products?categoryId=${item.id}`}
          key={item.id}
          className="flex flex-col gap-1 items-center"
        >
          <Image
            src={item.images[0]}
            alt="image"
            height={1000}
            width={1000}
            className="h-28 w-28 rounded-md object-cover"
          />
          <h1>{item.name}</h1>
        </Link>
      ))}
    </div>
  );
};
