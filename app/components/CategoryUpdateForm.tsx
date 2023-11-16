"use client";

import { Category } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateQuery } from "../lib/queries/customQuery";

interface CategoryUpdateFormProps {
  category: Category;
}

export const CategoryUpdateForm: React.FC<CategoryUpdateFormProps> = ({
  category,
}) => {
  const [name, setName] = useState(category.name || "");

  const { update, isPending } = useUpdateQuery({
    endpoint: "category",
    queryKey: "categories",
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        update({ name: name, id: category.id });
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
