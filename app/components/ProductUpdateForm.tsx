"use client";

import { BillBoard, Color, Product, Size } from "@prisma/client";
import { FormEvent, useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateProduct } from "../lib/queries/product";

interface ProductUpdateFormProps {
  product: Product | Color | Size | BillBoard;
}

type Payload = {
  name: string;
  id: string;
};

export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({
  product,
}) => {
  const [name, setName] = useState(product.name);

  const { updateProduct, isPending } = useUpdateProduct();
  const handleUpdate = async (e: FormEvent, payload: Payload) => {
    e.preventDefault();
    updateProduct(payload);
  };
  return (
    <form
      onSubmit={(e) => handleUpdate(e, { name: name || "", id: product.id })}
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
