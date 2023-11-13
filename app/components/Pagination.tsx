import { Dispatch, SetStateAction } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { itemsPerPage } from "../lib/utils";

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
        onClick={() => {
          setPage((prevState: number) => {
            return prevState - 1;
          });
        }}
      >
        <BsArrowLeftSquareFill />
      </button>
      <button
        disabled={page * itemsPerPage >= count}
        onClick={() => {
          setPage((prevState: number) => {
            return prevState + 1;
          });
        }}
      >
        <BsArrowRightSquareFill />
      </button>
    </div>
  );
};
