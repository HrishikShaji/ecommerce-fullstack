"use client";

import { Category as CategoryType, Product } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useAddQuery } from "../lib/queries/customQuery";
import { validateCategoryPayload } from "../lib/validators/category";

interface SubCategoryAddFormProps {
  category: CategoryType;
}

export const SubCategoryAddForm: React.FC<SubCategoryAddFormProps> = ({
  category,
}) => {
  const [name, setName] = useState("");

  const { add, isPending } = useAddQuery({
    endpoint: "category",
    queryKey: "categories",
    validator: validateCategoryPayload,
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        add({ name: name, parentId: category.id });
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
