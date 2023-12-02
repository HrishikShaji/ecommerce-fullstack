"use client";

import { ProductChild } from "@/types/types";
import { Spinner } from "../components/ui/Spinner";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isError, error, isLoading, refetch } = useFilterQuery({
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
      <div className="w-full min-h-screen p-10 grid grid-cols-3 gap-4">
        {data.length === 0 ? (
          <h1>No Results</h1>
        ) : (
          data.map((item: ProductChild) => (
            <div key={item.id} className="p-2 bg-neutral-600 rounded-md">
              <h1>{item.name}</h1>
              <h1>{item.color.name}</h1>
              <h1>{item.size.name}</h1>
              <h1>{item.billboard.name}</h1>
              <h1>{item.category.name}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
