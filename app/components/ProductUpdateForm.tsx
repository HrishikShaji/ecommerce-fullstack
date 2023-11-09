"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateProduct } from "../lib/queries/product";

interface ProductUpdateFormProps {
  product: Product;
}

export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({
  product,
}) => {
  const [name, setName] = useState(product.name || "");

  const { updateProduct, isPending } = useUpdateProduct();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        updateProduct({ name: name, id: product.id });
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
