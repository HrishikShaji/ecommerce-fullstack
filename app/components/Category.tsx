"use client";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { FormEvent, useState } from "react";
import { CategoryChild } from "@/types/types";
import { BsCircleFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";

interface CategoryProps {
  category: CategoryChild;
}

type payload = {
  parentId: string;
  name: string;
};

export const Category: React.FC<CategoryProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [subCategory, setSubCategory] = useState("");

  const queryClient = useQueryClient();

  const { mutate: addSubCategory, isPending: isAdding } = useMutation({
    mutationFn: async (payload: payload) => {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onError: () => {
      return <div>Error adding subCategory</div>;
    },
    onSuccess: () => {
      setSubCategory("");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/category?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error adding subCategory</div>;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const handleCategory = async (e: FormEvent, payload: payload) => {
    e.preventDefault();
    addSubCategory(payload);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center  border-b-2 p-2 ${
          category.parentId === null ? "bg-neutral-900" : "bg-neutral-900"
        } `}
      >
        <div className="flex items-center gap-4">
          <BsCircleFill size={10} />
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
          className="flex gap-2 w-full"
          onSubmit={(e) =>
            handleCategory(e, { parentId: category.id, name: subCategory })
          }
        >
          <input
            value={subCategory}
            className="p-2 w-full text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : shoes"
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <button className="px-3 py-2 border-white border-2">
            {isAdding ? <Spinner /> : "Add"}
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
