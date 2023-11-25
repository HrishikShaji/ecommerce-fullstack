"use client";
import { useEffect, useState } from "react";
import { useGetQuery } from "../lib/queries/customQuery";
import BillboardForm from "./BillboardForm";
import Search from "./ui/Search";
import Table from "./ui/Table";
import { useSearch } from "../lib/queries/search";

const BillBoardSection = () => {
  const [searchString, setSearchString] = useState("");
  const { data, isError } = useGetQuery({
    endpoint: "billboard",
    page: 1,
    sort: "LATEST",
    queryKey: "billboards",
  });

  const {
    results,
    isError: isSearchError,
    isLoading,
    refetch,
  } = useSearch({
    searchString: searchString,
    section: "billBoard",
    page: 1,
    sort: "LATEST",
  });

  useEffect(() => {
    refetch();
  }, [searchString]);

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
          <div>
            <Search onChange={setSearchString} />
          </div>
        </div>
        <Table
          data={searchString ? results : data}
          headings={["Billboard", "Date"]}
        />
      </div>
    </div>
  );
};

export default BillBoardSection;
