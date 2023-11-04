"use client";
import { Category as CategoryType } from "@prisma/client";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

interface CategoryProps {
  category: CategoryType;
}

export const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <div className="flex justify-between items-center bg-neutral-800 p-2">
      <h1>{category.name}</h1>
      <div className="flex gap-2">
        <button>
          <IoAddCircle />
        </button>
        <button>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};
