"use client";

import { ProductChild, SortObjectType, SortType } from "@/types/types";
import { Spinner } from "../components/ui/Spinner";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { setCheckBoxValues } from "@/redux/slices/filterSlice";
import { ProductCard } from "../components/ProductCard";
import { Sort } from "../components/ui/Sort";
import { useState } from "react";

const sortItems: SortObjectType[] = [
  {
    title: "Latest",
    value: "LATEST",
  },
  {
    title: "Oldest",
    value: "OLDEST",
  },
];
const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") as string;
  const { data, isError, isLoading, setFilterSortValues, sortValues } =
    useFilterQuery({
      endpoint: "filter",
      queryKey: "filters",
      page: 1,
      sort: "LATEST",
      setDefault: () =>
        dispatch(
          setCheckBoxValues({
            [categoryId]: {
              value: true,
              filterName: "category",
            },
          }),
        ),
    });

  console.log(sortValues);
  if (isError) return <div className="text-white">Error</div>;
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col gap-5 text-white p-5">
      <div className="flex gap-2 justify-end">
        <button
          className="px-3 py-2 bg-white text-black rounded-md"
          onClick={() => dispatch(onOpen({ mode: "filter", data }))}
        >
          Filter
        </button>
        <Sort
          sortItems={sortItems}
          setSort={({ title, value }: { title: string; value: SortType }) =>
            setFilterSortValues({ title, value })
          }
        />
      </div>
      <div className="w-full  grid grid-cols-3 gap-4">
        {data.length === 0 ? (
          <h1>No Results</h1>
        ) : (
          data.map((item: ProductChild) => (
            <ProductCard item={item} key={item.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
