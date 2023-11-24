"use client";
import { useState } from "react";
import { useGetQuery } from "../lib/queries/customQuery";
import BillboardForm from "./BillboardForm";
import Search from "./ui/Search";
import Table from "./ui/Table";

const BillBoardSection = () => {
  const [searchString, setSearchString] = useState("");
  const { data, isError } = useGetQuery({
    endpoint: "billboard",
    page: 1,
    sort: "LATEST",
    queryKey: "billboards",
  });

  if (isError) return null;

  const searchResults = data?.filter((item, i) => {
    return item.name.includes(searchString.toLowerCase());
  });
  console.log(searchResults);
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
        <Table data={searchResults} headings={["Billboard", "Date"]} />
      </div>
    </div>
  );
};

export default BillBoardSection;
