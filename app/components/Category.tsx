"use client";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { FormEvent, useState } from "react";
import { CategoryChild } from "@/types/types";
import { BsCircleFill } from "react-icons/bs";
import { Spinner } from "./Spinner";
import { useAddCategory, useDeleteCategory } from "../lib/queries/category";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";

interface CategoryProps {
  category: CategoryChild;
}

export const Category: React.FC<CategoryProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [subCategory, setSubCategory] = useState("");

  const { addCategory, isPending } = useAddCategory();
  const { deleteCategory, isDeleting } = useDeleteCategory();

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div
        className={`flex justify-between items-center  border-b-2 pl-0 p-2 ${
          category.parentId === null ? "bg-neutral-900" : "bg-neutral-900"
        } `}
      >
        <div className="flex items-center gap-4">
          <div className="bg-neutral-700 h-full p-2">
            <BsCircleFill size={10} />
          </div>
          <h1>{category.name}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsSubOpen(!isSubOpen)}>
            {isSubOpen ? (
              <IoMdArrowDropupCircle />
            ) : (
              <IoMdArrowDropdownCircle />
            )}
          </button>
          <button
            onClick={() =>
              dispatch(onOpen({ mode: "category", data: category }))
            }
          >
            <MdEdit />
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            <IoAddCircle />
          </button>
          <button onClick={() => deleteCategory(category.id)}>
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </div>
      </div>
      {isOpen && (
        <form
          className="flex gap-2 mt-1 w-full "
          onSubmit={(e) => {
            e.preventDefault();
            addCategory({ parentId: category.id, name: subCategory });
            setSubCategory("");
          }}
        >
          <input
            value={subCategory}
            className="p-2 w-full text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : shoes"
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <button className="px-3 py-2 border-white border-2">
            {isPending ? <Spinner /> : "Add"}
          </button>
        </form>
      )}
      {isSubOpen && (
        <div className="pl-10">
          {category.children.length > 0 &&
            (category.children as CategoryChild[]).map(
              (category: CategoryChild) => (
                <Category category={category} key={category.id} />
              ),
            )}
        </div>
      )}
    </div>
  );
};
