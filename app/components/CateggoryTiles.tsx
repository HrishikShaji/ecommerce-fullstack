import Link from "next/link";
import { useGetQuery } from "../hooks/useGetQuery";
import { CategoryChild } from "@/types/types";
import Image from "next/image";
import { Slider } from "./ui/Slider";

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
    <div className="h-[70vh] w-full">
      <Slider autoSlide={false} autoSlideInterval={1000}>
        {data.map((item: CategoryChild) => (
          <Link
            href={`/products?categoryId=${item.id}`}
            key={item.id}
            className=" h-[70vh] relative w-full flex-shrink-0"
          >
            <h6 className="absolute text-center top-[50%] left-[50%] -translate-x-[50%] mix-blend-difference -translate-y-[50%] text-8xl text-white ">
              {item.name} Collections
            </h6>
            <Image
              src={item.images[0]}
              alt="image"
              height={1000}
              width={1000}
              className="h-full w-full rounded-3xl object-cover"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};
