"use client";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { useState } from "react";
import { CategoryChild } from "@/types/types";
import { BsCircleFill } from "react-icons/bs";
import { Spinner } from "./Spinner";
import { useAddCategory, useDeleteCategory } from "../lib/queries/category";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { RowActions } from "./RowActions";

interface CategoryProps {
  data: CategoryChild;
}

export const Category: React.FC<CategoryProps> = ({ data }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);

  const { deleteCategory, isDeleting } = useDeleteCategory();

  const dispatch = useDispatch<AppDispatch>();

  return (
    <tbody className="w-full">
      <tr
        className={`flex w-full justify-between items-center border-neutral-700 border-b-2 pl-0 p-1 ${
          data.parentId === null ? "bg-neutral-800" : "bg-neutral-800"
        } `}
      >
        <tr className="flex items-center w-full gap-4">
          <button onClick={() => setIsSubOpen(!isSubOpen)}>
            {isSubOpen ? (
              <IoMdArrowDropupCircle />
            ) : (
              <IoMdArrowDropdownCircle />
            )}
          </button>
          <h1>{data.name}</h1>
        </tr>
        <RowActions
          deleteAction={deleteCategory}
          data={data}
          isDeleting={isDeleting}
          mode="category"
        />
      </tr>
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
    </tbody>
  );
};
