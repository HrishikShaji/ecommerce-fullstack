"use client";
import { useEffect, useState } from "react";
import { useGetQuery } from "../lib/queries/customQuery";
import BillboardForm from "./BillboardForm";
import Search from "./ui/Search";
import Table from "./ui/Table";
import { useSearch } from "../lib/queries/search";
import Dropdown from "./ui/Dropdown";
import { SortObjectType } from "@/types/types";
import { Sort } from "./ui/Sort";
import { Pagination } from "./ui/Pagination";

const billboardSortValues: SortObjectType[] = [
  {
    title: "Latest",
    value: "LATEST",
  },
  {
    title: "Oldest",
    value: "OLDEST",
  },
];

const BillBoardSection = () => {
  const [searchString, setSearchString] = useState("");
  const [sort, setSort] = useState<SortObjectType>({
    title: "Latest",
    value: "LATEST",
  });
  const [page, setPage] = useState(1);
  console.log(sort);
  const {
    data,
    isError,
    count,
    refetch: refetchData,
  } = useGetQuery({
    endpoint: "billboard",
    page: page,
    sort: sort.value,
    queryKey: "billboards",
  });

  const {
    results,
    isError: isSearchError,
    isLoading,
    refetch,
    count: searchCount,
  } = useSearch({
    searchString: searchString,
    section: "billBoard",
    page: page,
    sort: sort.value,
  });

  useEffect(() => {
    refetchData();
    refetch();
  }, [searchString, sort, page]);

  if (isError) return null;
  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6 px-2">
        <h1 className="font-semibold text-2xl">Add Billboards </h1>
        <BillboardForm />
      </div>
      <div className=" flex flex-col gap-6">
        <div className="flex justify-between w-full px-2">
          <h1 className="text-2xl font-semibold">Billboards</h1>
          <div className="flex gap-3">
            <Search onChange={setSearchString} />
            <Sort setSort={setSort} sortItems={billboardSortValues} />
          </div>
        </div>
        <Table
          data={searchString ? results : data}
          headings={["Billboard", "Date"]}
        />
      </div>
      <Pagination
        count={searchString ? searchCount : count}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default BillBoardSection;
