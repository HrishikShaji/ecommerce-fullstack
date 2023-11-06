"use client";
import { Category } from "../components/Category";
import { CategoryChild } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";
import { FormEvent, useState } from "react";
import {
  CategoryPayload,
  validateCategoryPayload,
} from "../lib/validators/category";
import {
  ProductPayload,
  validateProductPayload,
} from "../lib/validators/Product";
import { DropDown } from "./DropDown";

export const ProductSection = () => {
  const [product, setProduct] = useState("");

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: async (payload: ProductPayload) => {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onError: () => {
      return <div>Error addind category</div>;
    },
    onSuccess: () => {
      refetch();
      setProduct("");
    },
  });
  const handleAddProduct = async (e: FormEvent, payload: ProductPayload) => {
    e.preventDefault();
    const isValidPayload = validateProductPayload(payload);
    addProduct(isValidPayload);
  };
  const {
    data: categories,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Products</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) => handleAddProduct(e, { name: product })}
        >
          <input
            value={product}
            className="p-2 text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : shoes"
            onChange={(e) => setProduct(e.target.value)}
          />
          <button type="submit" className="px-3 py-2 border-white border-2">
            {isPending ? <Spinner /> : "Add"}
          </button>
          <DropDown />
        </form>
      </div>
      {/* 

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Categories</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {categories.map((category: CategoryChild) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
			*/}
    </div>
  );
};
