"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateQuery } from "../lib/queries/customQuery";

interface ProductUpdateFormProps {
  product: Product;
}

export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({
  product,
}) => {
  const [name, setName] = useState(product.name || "");

  const { update, isPending } = useUpdateQuery({
    endpoint: "product",
    queryKey: "products",
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        update({ name: name, id: product.id });
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
