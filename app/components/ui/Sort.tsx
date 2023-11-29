import { Dispatch, SetStateAction, useState } from "react";
import { SortObjectType } from "@/types/types";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

interface SortProps {
  setSort: Dispatch<SetStateAction<SortObjectType>>;
  sortItems: SortObjectType[];
}

export const Sort: React.FC<SortProps> = (props) => {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div className="relative gap-2 bg-neutral-700 py-1 px-2   rounded-md">
      <div className="flex gap-6 items-center">
        <h1>Sort</h1>
        <button onClick={() => setIsSortOpen(!isSortOpen)}>
          {isSortOpen ? <BiUpArrow /> : <BiDownArrow />}
        </button>
      </div>
      {isSortOpen && (
        <div className="absolute mt-2 bg-neutral-500 shadow-neutral-700 shadow-lg left-0 w-full overflow-hidden rounded-md pb-1">
          {props.sortItems?.map((item) => (
            <button
              key={item.value}
              onClick={() => props.setSort(item)}
              className="w-full py-1 border-b-2 border-neutral-800 hover:bg-neutral-700"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
