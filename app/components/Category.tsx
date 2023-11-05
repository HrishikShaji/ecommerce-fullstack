"use client";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { FormEvent, useState } from "react";
import { CategoryChild } from "@/types/types";
import { BsCircleFill } from "react-icons/bs";

interface CategoryProps {
  category: CategoryChild;
}

type payload = {
  parentId: string;
  name: string;
};

export const Category: React.FC<CategoryProps> = ({ category }) => {
  const [loading, setLoading] = useState(false);
  const [subLoading, setSubLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [subCategory, setSubCategory] = useState("");

  const deleteCategory = async (id: string) => {
    try {
      setLoading(true);
      await fetch(`/api/category?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addSubCategory = async (e: FormEvent, payload: payload) => {
    e.preventDefault();
    try {
      setSubLoading(true);
      await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubLoading(false);
    }
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
            {loading ? "Deleting" : <MdDelete />}
          </button>
        </div>
      </div>
      {isOpen && (
        <form
          className="flex gap-2 w-full"
          onSubmit={(e) =>
            addSubCategory(e, { parentId: category.id, name: subCategory })
          }
        >
          <input
            value={subCategory}
            className="p-2 w-full text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : shoes"
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <button className="px-3 py-2 border-white border-2">
            {subLoading ? "Adding..." : "Add"}
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
