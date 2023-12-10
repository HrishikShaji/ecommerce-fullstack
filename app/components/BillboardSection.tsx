"use client";
import BillboardForm from "./BillboardForm";
import Search from "./ui/Search";
import Table from "./ui/Table";
import { SortObjectType } from "@/types/types";
import { Sort } from "./ui/Sort";
import { Pagination } from "./ui/Pagination";
import { useDataTable } from "./ui/hooks/useDataTable";
import { Spinner } from "./ui/Spinner";
import { useParams } from "next/navigation";

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
  const { userId, storeId } = useParams();
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
    endpoint: `${userId}/store/${storeId}/billboard`,
    section: "billBoard",
    queryKey: "billboards",
    initialSortObj: billboardSortValues[0],
  });

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
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            lookup={["name", "createdAt"]}
            endpoint={`${userId}/store/${storeId}/billboard`}
            queryKey="billboards"
            data={data}
            headings={["Billboard", "Date"]}
            mode="billboard"
          />
        )}
      </div>
      <Pagination count={count} page={page} setPage={setPage} />
    </div>
  );
};

export default BillBoardSection;
