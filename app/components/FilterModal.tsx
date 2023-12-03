import { useState } from "react";
import { useFilterQuery } from "../hooks/useFilterQuery";
import { FilterMenu } from "./ui/FilterMenu";

type FilterType = "color" | "size" | "billboard" | "category";

export const FilterModal = () => {
  const [filter, setFilter] = useState<FilterType>("color");

  const { values, refetch, handleCheckBox } = useFilterQuery({
    endpoint: "filter",
    queryKey: "filters",
    page: 1,
    sort: "LATEST",
  });
  const handleFilter = () => {
    console.log("refetching", values);
    refetch();
  };
  return (
    <div className="flex w-[500px] h-[300px] rounded-md overflow-hidden relative">
      <div className="bg-neutral-600 w-1/3 h-full flex flex-col gap-2 p-1">
        <button
          className="hover:bg-neutral-800   border-b-2 border-black text-left px-2"
          onClick={() => setFilter("color")}
        >
          Color
        </button>
        <button
          className="hover:bg-neutral-800 border-b-2 border-black text-left px-2"
          onClick={() => setFilter("size")}
        >
          Size
        </button>
        <button
          className="hover:bg-neutral-800 border-b-2 border-black text-left px-2"
          onClick={() => setFilter("category")}
        >
          Category
        </button>
        <button
          className="hover:bg-neutral-800 border-b-2 border-black text-left px-2"
          onClick={() => setFilter("billboard")}
        >
          Billboard
        </button>
      </div>
      <div className="bg-neutral-500 w-2/3 h-full p-2">
        {filter === "color" ? (
          <FilterMenu
            handleCheckBox={(key: string, value: boolean) =>
              handleCheckBox(key, value, filter)
            }
            field={filter}
            values={values}
          />
        ) : null}
        {filter === "size" ? (
          <div>
            <h1>Size</h1>
          </div>
        ) : null}
        {filter === "category" ? (
          <div>
            <h1>Category</h1>
          </div>
        ) : null}
        {filter === "billboard" ? (
          <div>
            <h1>Billboard</h1>
          </div>
        ) : null}
      </div>
      <button
        onClick={handleFilter}
        className="p-1 rounded-md bg-white text-black absolute bottom-2 right-2"
      >
        Submit
      </button>
    </div>
  );
};
