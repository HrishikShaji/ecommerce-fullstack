"use client";

import { BillBoard, Color, Product, Size } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { Spinner } from "./Spinner";

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
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
      await fetch("/api/product", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
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
