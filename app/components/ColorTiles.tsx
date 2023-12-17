import Link from "next/link";
import { useGetQuery } from "../hooks/useGetQuery";
import { BillBoard, Color } from "@prisma/client";

export const ColorTiles = () => {
  const { data, error, isError, isLoading } = useGetQuery({
    endpoint: "color",
    queryKeys: ["colors"],
    page: 1,
    sort: "LATEST",
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="flex gap-2">
      {data.map((item: Color) => (
        <Link
          href={`/products?colorId=${item.id}`}
          key={item.id}
          className="flex flex-col gap-1 items-center"
        >
          <div
            className={`h-20 w-20 rounded-full border-white border-2  `}
            style={{ backgroundColor: item.hexCode }}
          />
          <h1>{item.name}</h1>
        </Link>
      ))}
    </div>
  );
};
