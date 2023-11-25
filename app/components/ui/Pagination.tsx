import { Dispatch, SetStateAction } from "react";
import { itemsPerPage } from "@/app/lib/utils";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

interface PaginationProps {
  page: number;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  setPage,
}) => {
  return (
    <div className="w-full flex gap-2 justify-end">
      <button
        disabled={page === 1}
        className="p-2 bg-neutral-700 rounded-md disabled:opacity-50"
        onClick={() => {
          setPage((prevState: number) => {
            return prevState - 1;
          });
        }}
      >
        <BiLeftArrow />
      </button>
      <button
        disabled={page * itemsPerPage >= count}
        className="p-2 bg-neutral-700 rounded-md disabled:opacity-50"
        onClick={() => {
          setPage((prevState: number) => {
            return prevState + 1;
          });
        }}
      >
        <BiRightArrow />
      </button>
    </div>
  );
};
