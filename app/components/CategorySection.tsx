"use client";
import { Category } from "../components/Category";
import { CategoryChild } from "@/types/types";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { useAddCategory, useGetCategories } from "../lib/queries/category";

export const CategorySection = () => {
  const [category, setCategory] = useState("");

  const { categories, isError, isLoading } = useGetCategories();
  const { addCategory, isPending } = useAddCategory();

  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Categories</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addCategory({ name: category });
            setCategory("");
          }}
        >
          <input
            value={category}
            className="p-2 text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : shoes"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button className="px-3 py-2 border-white border-2">
            {isPending ? <Spinner /> : "Add"}
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Categories</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {categories.map((category: CategoryChild) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
