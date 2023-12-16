import Link from "next/link";
import { useGetQuery } from "../hooks/useGetQuery";
import { CategoryChild } from "@/types/types";
import Image from "next/image";
import { getCategoryChildrenSplit } from "../lib/utils";

export const CategoryTiles = () => {
  const { data, isError, isLoading } = useGetQuery({
    endpoint: "category",
    queryKey: "categories",
    page: 1,
    sort: "LATEST",
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const { mainCategories, subCategories } = getCategoryChildrenSplit(data);

  return (
    <div className="flex flex-col gap-20 w-full">
      <div className="grid grid-cols-3 w-full gap-10">
        {mainCategories.map((item: CategoryChild) => (
          <Link
            href={`/categories/?categoryId=${item.id}`}
            key={item.id}
            className=" h-full  w-full flex flex-col gap-2 items-center"
          >
            <Image
              src={item.images[0]}
              alt="image"
              height={1000}
              width={1000}
              className="h-60 w-full rounded-3xl object-center object-cover"
            />
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 justify-between">
        {subCategories.map((item) => (
          <Link
            href={`/products?categoryId=${item.id}`}
            key={item.id}
            className="flex flex-col gap-2 items-center"
          >
            <Image
              src={item.images[0]}
              alt="image"
              height={1000}
              width={1000}
              className="h-20 w-20 rounded-3xl object-center object-cover"
            />
            <h2>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
