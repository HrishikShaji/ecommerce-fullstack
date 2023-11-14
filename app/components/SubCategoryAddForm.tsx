"use client";

import { Category as CategoryType, Product } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useAddCategory } from "../lib/queries/category";
import { Category } from "./Category";

interface SubCategoryAddFormProps {
  category: CategoryType;
}

export const SubCategoryAddForm: React.FC<SubCategoryAddFormProps> = ({
  category,
}) => {
  const [name, setName] = useState("");

  const { addCategory, isPending } = useAddCategory();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        addCategory({ name: name, parentId: category.id });
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
