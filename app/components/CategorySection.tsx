"use client";
import Search from "./ui/Search";
import Table from "./ui/Table";
import { SortObjectType } from "@/types/types";
import { Sort } from "./ui/Sort";
import { Pagination } from "./ui/Pagination";
import { useDataTable } from "./ui/useDataTable";
import { Spinner } from "./ui/Spinner";
import CategoryForm from "./CategoryForm";

const categorySortValues: SortObjectType[] = [
  {
    title: "Latest",
    value: "LATEST",
  },
  {
    title: "Oldest",
    value: "OLDEST",
  },
];

const CategorySection = () => {
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
    endpoint: "category",
    section: "category",
    queryKey: "categories",
    initialSortObj: categorySortValues[0],
  });

  if (isError) return null;

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6 px-2">
        <h1 className="font-semibold text-2xl">Add Categories</h1>
        <CategoryForm />
      </div>
      <div className=" flex flex-col gap-6">
        <div className="flex justify-between w-full px-2">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <div className="flex gap-3">
            <Search onChange={setSearchString} />
            <Sort setSort={setSort} sortItems={categorySortValues} />
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            lookup={["name", "createdAt"]}
            mode="category"
            endpoint="category"
            queryKey="categories"
            data={data}
            headings={["Category", "Date"]}
          />
        )}
      </div>
      <Pagination count={count} page={page} setPage={setPage} />
    </div>
  );
};

export default CategorySection;
