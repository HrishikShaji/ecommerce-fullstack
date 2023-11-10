"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { useAddCategory, useGetCategories } from "../lib/queries/category";
import { SectionContainer } from "./SectionContainer";
import { Form, InputItem } from "./Form";

export const CategorySection = () => {
  const [category, setCategory] = useState("");

  const { categories, isError, isLoading } = useGetCategories();
  const { addCategory, isPending } = useAddCategory();

  const values: InputItem[] = [
    {
      label: "Category",
      name: "name",
      value: category,
      placeholder: "eg: shirts",
      onChange: setCategory,
    },
  ];
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Categories</h1>
        <Form values={values} isPending={isPending} apiFunction={addCategory} />
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
