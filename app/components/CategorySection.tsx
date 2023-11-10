"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { useAddCategory, useGetCategories } from "../lib/queries/category";
import { SectionContainer } from "./SectionContainer";

export const CategorySection = () => {
  const [category, setCategory] = useState("");

  const { categories, isError, isLoading } = useGetCategories();
  const { addCategory, isPending } = useAddCategory();

  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Categories</h1>
        <form
          className="flex gap-2 items-end"
          onSubmit={(e) => {
            e.preventDefault();
            addCategory({ name: category });
            setCategory("");
          }}
        >
          <div className="flex flex-col gap-2">
            <label>Categort Name</label>
            <input
              value={category}
              className="p-1 rounded-md text-black focus:outline-none placeholder-gray-600"
              placeholder="eg : shoes"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <button className="px-3 py-1 bg-white text-black font-semibold rounded-md">
            {isPending ? <Spinner /> : "Add"}
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Categories</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <SectionContainer title="Categories" data={categories} />
        )}
      </div>
    </div>
  );
};
