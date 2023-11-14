"use client";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { useState } from "react";
import { CategoryChild } from "@/types/types";
import { RowActions } from "./RowActions";
import { useDeleteCategory } from "../lib/queries/category";

interface CategoryProps {
  data: CategoryChild;
}

export const Category: React.FC<CategoryProps> = ({ data }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);

  const { deleteCategory, isDeleting } = useDeleteCategory();

  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center border-neutral-700 border-b-2 px-0 py-1 bg-neutral-800">
        <div className="flex items-center w-full gap-4">
          <button onClick={() => setIsSubOpen(!isSubOpen)}>
            {isSubOpen ? (
              <IoMdArrowDropupCircle />
            ) : (
              <IoMdArrowDropdownCircle />
            )}
          </button>
          <h1>{data.name}</h1>
        </div>
        <RowActions
          deleteAction={deleteCategory}
          data={data}
          isDeleting={isDeleting}
          mode="category"
        />
      </div>
      {isSubOpen && (
        <div className="pl-10 w-full flex-grow">
          {data.children.length > 0 &&
            (data.children as CategoryChild[]).map(
              (category: CategoryChild) => (
                <Category data={category} key={category.id} />
              ),
            )}
        </div>
      )}
    </div>
  );
};
