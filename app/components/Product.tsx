"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { FormEvent } from "react";
import { ProductChild } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import {
  CategoryPayload,
  validateCategoryPayload,
} from "../lib/validators/category";

interface ProductProps {
  product: ProductChild;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isPending: isAdding } = useMutation({
    mutationFn: async (payload: CategoryPayload) => {
      const response = await fetch("/api/product", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onError: () => {
      return <div>Error adding subCategory</div>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/product?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  const handleProduct = async (e: FormEvent, payload: CategoryPayload) => {
    e.preventDefault();
    const isValidPayload = validateCategoryPayload(payload);
  };

  return (
    <>
      <tr key={product.id} className="">
        <td>{product.name}</td>
        <td>{product.category.name}</td>
        <td>{product.id}</td>
        <td className="flex items-center w-full justify-center  gap-2">
          <button className="cursor-pointer">
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteProduct(product.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </>
  );
};
