"use client";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { FormEvent, useState } from "react";
import { CategoryChild, ProductChild } from "@/types/types";
import { BsCircleFill } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import {
  CategoryPayload,
  validateCategoryPayload,
} from "../lib/validators/category";
import { Product as ProductType } from "@prisma/client";

interface ProductProps {
  product: ProductChild;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  console.log(product);
  const queryClient = useQueryClient();

  const { mutate: addSubCategory, isPending: isAdding } = useMutation({
    mutationFn: async (payload: CategoryPayload) => {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onError: () => {
      return <div>Error adding subCategory</div>;
    },
    onSuccess: () => {
      setSubCategory("");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
    addSubCategory(isValidPayload);
  };

  return (
    <div>
      <div
        className={`flex justify-between items-center  border-b-2 pl-0 p-2  `}
      >
        <div className="flex items-center gap-4">
          <div className="bg-neutral-700 h-full p-2">
            <BsCircleFill size={10} />
          </div>
          <h1>{product.name}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsSubOpen(!isSubOpen)}>
            {isSubOpen ? (
              <IoMdArrowDropupCircle />
            ) : (
              <IoMdArrowDropdownCircle />
            )}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            <IoAddCircle />
          </button>
          <button onClick={() => deleteProduct(product.id)}>
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </div>
      </div>
      {/* isOpen && (
        <form
          className="flex gap-2 mt-1 w-full "
          onSubmit={(e) =>
            handleCategory(e, { parentId: category.id, name: subCategory })
          }
        >
          <input
            value={subCategory}
            className="p-2 w-full text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : shoes"
            onChange={(e) => setSubCategory(e.target.value)}
          />
          <button className="px-3 py-2 border-white border-2">
            {isAdding ? <Spinner /> : "Add"}
          </button>
        </form>
      ) */}
    </div>
  );
};
