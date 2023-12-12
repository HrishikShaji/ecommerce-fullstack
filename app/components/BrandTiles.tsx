import Link from "next/link";
import { useGetQuery } from "../hooks/useGetQuery";
import { BillBoard, Brand } from "@prisma/client";

export const BrandTiles = () => {
  const { data, error, isError, isLoading } = useGetQuery({
    endpoint: "brand",
    queryKey: "brands",
    page: 1,
    sort: "LATEST",
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(error);
  return (
    <div className="flex gap-2">
      {data.map((item: Brand) => (
        <Link
          href={`/products?brandId=${item.id}`}
          key={item.id}
          className="flex flex-col gap-1 items-center"
        >
          <h1 className="p-2 rounde-md bg-neutral-500 rounded-md">
            {item.name}
          </h1>
        </Link>
      ))}
    </div>
  );
};
