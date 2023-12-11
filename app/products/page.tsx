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
import { Feed } from "../components/Feed";

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
  const {
    refetch,
    search,
    setSearch,
    data,
    isError,
    isLoading,
    setFilterSortValues,
  } = useFilterQuery({
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

  return (
    <div className="flex flex-col gap-5 text-white p-5">
      <div className="flex gap-2 justify-end">
        <div className="flex gap-2">
          <input
            value={search}
            placeholder="type..."
            className="p-2 rounded-md text-black"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="py-2 px-3 rounded-md bg-white text-black"
            onClick={() => refetch()}
          >
            Search
          </button>
        </div>
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
      <Feed data={data} isLoading={isLoading} />
    </div>
  );
};

export default Page;
