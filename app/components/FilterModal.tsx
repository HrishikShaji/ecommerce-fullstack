import { useState } from "react";

type FilterType = "color" | "size" | "billboard" | "category";

export const FilterModal = () => {
  const [filter, setFilter] = useState<FilterType>("color");
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
      <div className="bg-neutral-500 w-2/3 h-full">
        {filter === "color" ? (
          <div>
            <h1>Color</h1>
          </div>
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
      <button className="p-1 rounded-md bg-white text-black absolute bottom-2 right-2">
        Submit
      </button>
    </div>
  );
};
