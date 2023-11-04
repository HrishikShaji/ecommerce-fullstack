"use client";
import { Category as CategoryType } from "@prisma/client";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useState } from "react";

interface CategoryProps {
  category: CategoryType;
}

export const Category: React.FC<CategoryProps> = ({ category }) => {
  const [loading, setLoading] = useState(false);
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
  return (
    <div className="flex justify-between items-center bg-neutral-800 p-2">
      <h1>{category.name}</h1>
      <div className="flex gap-2">
        <button>
          <IoAddCircle />
        </button>
        <button onClick={() => deleteCategory(category.id)}>
          {loading ? "Deleting" : <MdDelete />}
        </button>
      </div>
    </div>
  );
};
