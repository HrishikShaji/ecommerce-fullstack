"use client";

import { Category } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateCategory } from "../lib/queries/category";

interface CategoryUpdateFormProps {
  category: Category;
}

export const CategoryUpdateForm: React.FC<CategoryUpdateFormProps> = ({
  category,
}) => {
  const [name, setName] = useState(category.name || "");

  const { updateCategory, isPending } = useUpdateCategory();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        updateCategory({ name: name, id: category.id });
      }}
    >
      <input
        value={name}
        className="p-2 rounded-md text-black"
        onChange={(e) => setName(e.target.value)}
      />
      <button>{isPending ? <Spinner /> : "Update"}</button>
    </form>
  );
};
