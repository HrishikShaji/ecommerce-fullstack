"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";
import { FormEvent, useState } from "react";
import {
  ProductPayload,
  validateProductPayload,
} from "../lib/validators/Product";
import { DropDown } from "./DropDown";
import { Product as ProductType } from "@prisma/client";
import { Product } from "./Product";
import { ProductChild } from "@/types/types";

type Item = {
  name: string;
  id: string;
};

export const ProductSection = () => {
  const [product, setProduct] = useState("");

  const [selectedItem, setSelectedItem] = useState<Item>({
    name: "",
    id: "",
  });
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
      setProduct("");
      refetch();
    },
  });
  const handleAddProduct = async (e: FormEvent, payload: ProductPayload) => {
    e.preventDefault();
    const isValidPayload = validateProductPayload(payload);
    addProduct(isValidPayload);
  };
  const {
    data: products,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`/api/product`, {
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
          onSubmit={(e) =>
            handleAddProduct(e, { name: product, categoryId: selectedItem.id })
          }
        >
          <input
            value={product}
            className="p-2 text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : shoes"
            onChange={(e) => setProduct(e.target.value)}
          />
          <DropDown
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
          <button type="submit" className="px-3 py-2 border-white border-2">
            {isPending ? <Spinner /> : "Add"}
          </button>
        </form>
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <table className="w-full">
            <tr className="w-full flex justify-around">
              <th>Product</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
            {products.map((product: ProductChild) => {
              return (
                <tr key={product.id} className="w-full flex justify-around">
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>{product.id}</td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
};
