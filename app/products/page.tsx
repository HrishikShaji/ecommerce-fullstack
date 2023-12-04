"use client";

import { ProductChild } from "@/types/types";
import { Spinner } from "../components/ui/Spinner";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import Image from "next/image";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError, isLoading } = useFilterQuery({
    endpoint: "filter",
    queryKey: "filters",
    page: 1,
    sort: "LATEST",
  });
  if (isError) return <div className="text-white">Error</div>;
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col gap-5 text-white">
      <button
        className="px-3 py-2 bg-white text-black rounded-md"
        onClick={() => dispatch(onOpen({ mode: "filter", data }))}
      >
        Filter
      </button>
      <div className="w-full  p-10 grid grid-cols-3 gap-4">
        {data.length === 0 ? (
          <h1>No Results</h1>
        ) : (
          data.map((item: ProductChild) => (
            <div
              key={item.id}
              className="p-2 bg-neutral-700 flex flex-col gap-3 rounded-md"
            >
              <div className="bg-white h-[200px] w-[200px] rounded-md flex justify-center items-center p-5">
                <Image
                  className="h-[150px] w-[150px]  object-contain"
                  alt="image"
                  height={1000}
                  width={1000}
                  src={item.images[0]}
                />
              </div>
              <div>
                <h1 className="font-semibold ">{item.name}</h1>
                <h1 className="text-xs font-semibold">{`${item.price}$`}</h1>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
