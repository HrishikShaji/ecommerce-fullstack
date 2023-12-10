"use client";
import { CategoryChild } from "@/types/types";
import { useGetQuery } from "./hooks/useGetQuery";
import Image from "next/image";

export default function Home() {
  const { data, isError, isLoading } = useGetQuery({
    endpoint: "category",
    queryKey: "categories",
    page: 1,
    sort: "LATEST",
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  console.log(data);
  return (
    <main className="flex min-h-screen text-white flex-col items-center justify-between p-24">
      <div className="flex gap-2">
        {data.map((item: CategoryChild) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <Image
              src={item.images[0]}
              alt="image"
              height={1000}
              width={1000}
              className="h-20 w-20 rounded-md object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
