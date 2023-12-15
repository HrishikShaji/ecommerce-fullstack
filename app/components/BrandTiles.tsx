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
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {data.map((item: Brand) => (
        <Link
          href={`/products?brandId=${item.id}`}
          key={item.id}
          className="flex bg-neutral-500 rounded-3xl h-40 justify-center w-full flex-col gap-1 items-center"
        >
          <h6 className="text-3xl">{item.name}</h6>
        </Link>
      ))}
    </div>
  );
};
