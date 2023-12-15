import Link from "next/link";
import { useGetQuery } from "../hooks/useGetQuery";
import Image from "next/image";
import { BillBoard } from "@prisma/client";
import { Slider } from "./ui/Slider";

export const BillboardTiles = () => {
  const { data, error, isError, isLoading } = useGetQuery({
    endpoint: "billboard",
    queryKey: "billboards",
    page: 1,
    sort: "LATEST",
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="h-[70vh] w-full rounded-3xl overflow-hidden">
      <Slider autoSlide={false} autoSlideInterval={1000}>
        {data.map((item: BillBoard) => (
          <Link
            href={`/products?billboardId=${item.id}`}
            key={item.id}
            className=" h-[70vh] relative w-full flex-shrink-0"
          >
            <h6 className="absolute text-center top-[50%] left-[50%] -translate-x-[50%]  -translate-y-[50%] text-8xl text-white ">
              {item.name} Collections
            </h6>
            <Image
              src={item.images[0]}
              alt="image"
              height={1000}
              width={1000}
              className="h-full w-full object-cover"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};
