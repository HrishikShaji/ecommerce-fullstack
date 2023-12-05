import { useState } from "react";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { capitalizeFirstChar } from "../lib/utils";
import { FilterCheckBoxMenu } from "./ui/FilterCheckBoxMenu";
import { FilterRangeMenu } from "./ui/FilterRangeMenu";

const filters = ["color", "size", "category", "billboard", "price"];

export const FilterModal = () => {
  const [filter, setFilter] = useState("color");
  const { values, refetch } = useFilterQuery({
    endpoint: "filter",
    queryKey: "filters",
    page: 1,
    sort: "LATEST",
  });
  return (
    <div className="flex w-[500px] h-[300px] rounded-md overflow-hidden relative">
      <div className="bg-neutral-600 w-1/3 h-full flex flex-col  p-1">
        {filters.map((filter) => (
          <button
            key={filter}
            className="hover:bg-neutral-800   border-b-2 border-black py-1 text-left px-2"
            onClick={() => setFilter(filter)}
          >
            {capitalizeFirstChar(filter)}
          </button>
        ))}
      </div>
      <div className="bg-neutral-500 w-2/3 h-full p-2">
        {filter === "color" ? (
          <FilterCheckBoxMenu
            label="Color"
            endpoint="color"
            queryKey="colors"
            field={filter}
            values={values}
          />
        ) : null}
        {filter === "size" ? (
          <FilterCheckBoxMenu
            label="Size"
            endpoint="size"
            queryKey="sizes"
            field={filter}
            values={values}
          />
        ) : null}
        {filter === "category" ? (
          <FilterCheckBoxMenu
            label="Category"
            endpoint="category"
            queryKey="categories"
            field={filter}
            values={values}
          />
        ) : null}
        {filter === "billboard" ? (
          <FilterCheckBoxMenu
            label="Billboard"
            endpoint="billboard"
            queryKey="billboards"
            field={filter}
            values={values}
          />
        ) : null}
        {filter === "price" ? <FilterRangeMenu label="Price" /> : null}
      </div>
      <button
        onClick={() => refetch()}
        className="p-1 rounded-md bg-white text-black absolute bottom-2 right-2"
      >
        Submit
      </button>
    </div>
  );
};
