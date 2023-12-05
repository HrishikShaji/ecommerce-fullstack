"use client";
import Search from "./ui/Search";
import Table from "./ui/Table";
import { SortObjectType } from "@/types/types";
import { Sort } from "./ui/Sort";
import { Pagination } from "./ui/Pagination";
import { useDataTable } from "./ui/hooks/useDataTable";
import { Spinner } from "./ui/Spinner";
import ColorForm from "./ColorForm";

const colorSortValues: SortObjectType[] = [
  {
    title: "Latest",
    value: "LATEST",
  },
  {
    title: "Oldest",
    value: "OLDEST",
  },
];

const ColorSection = () => {
  const {
    data,
    count,
    isLoading,
    page,
    isError,
    setPage,
    setSearchString,
    setSort,
  } = useDataTable({
    endpoint: "color",
    section: "color",
    queryKey: "colors",
    initialSortObj: colorSortValues[0],
  });

  if (isError) return null;

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6 px-2">
        <h1 className="font-semibold text-2xl">Add Colors </h1>
        <ColorForm />
      </div>
      <div className=" flex flex-col gap-6">
        <div className="flex justify-between w-full px-2">
          <h1 className="text-2xl font-semibold">Colors</h1>
          <div className="flex gap-3">
            <Search onChange={setSearchString} />
            <Sort setSort={setSort} sortItems={colorSortValues} />
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            lookup={["name", "createdAt"]}
            endpoint="color"
            queryKey="colors"
            data={data}
            headings={["Color", "Date"]}
            mode="color"
          />
        )}
      </div>
      <Pagination count={count} page={page} setPage={setPage} />
    </div>
  );
};

export default ColorSection;
