import { Dispatch, SetStateAction, useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { SortType } from "./SectionContainer";

interface SortProps {
  setSort: Dispatch<SetStateAction<SortType>>;
}

export const Sort: React.FC<SortProps> = ({ setSort }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  return (
    <div className="relative flex gap-2 bg-neutral-700 py-1 px-2 items-center rounded-md">
      <h1>Sort</h1>
      <button onClick={() => setIsSortOpen(!isSortOpen)}>
        <IoMdArrowDropdownCircle />
      </button>
      {isSortOpen && (
        <div className="absolute px-1 py-2 w-[100px]  top-10 right-0 rounded-md bg-neutral-700">
          <button
            onClick={() => setSort(SortType.LATEST)}
            className="w-full py-1 border-b-2 border-neutral-800 hover:bg-neutral-800 rounded-md"
          >
            Latest
          </button>
          <button
            onClick={() => setSort(SortType.OLDEST)}
            className="w-full py-1 border-b-2 border-neutral-800 hover:bg-neutral-800 rounded-md"
          >
            Oldest
          </button>
        </div>
      )}
    </div>
  );
};
