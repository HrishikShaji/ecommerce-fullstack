"use client";

import { Category, Product } from "@prisma/client";
import { FormEvent, useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateProduct } from "../lib/queries/product";
import { useUpdateCategory } from "../lib/queries/category";

interface CategoryUpdateFormProps {
  category: Category;
}

type Payload = {
  name: string;
  id: string;
};

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
        value={name || ""}
        className="p-2 rounded-md text-black"
        onChange={(e) => setName(e.target.value)}
      />
      <button>{isPending ? <Spinner /> : "Update"}</button>
    </form>
  );
};
