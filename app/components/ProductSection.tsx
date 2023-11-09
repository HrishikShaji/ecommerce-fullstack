"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { DropDown } from "./DropDown";
import { Product } from "./Product";
import { ProductChild } from "@/types/types";
import { useAddProduct, useGetProducts } from "../lib/queries/product";
import { SectionContainer } from "./SectionContainer";

type Item = {
  name: string;
  id: string;
};

export const ProductSection = () => {
  const [product, setProduct] = useState("");
  const [selectedBillboardItem, setSelectedBillboardItem] = useState<Item>({
    name: "",
    id: "",
  });
  const [selectedItem, setSelectedItem] = useState<Item>({
    name: "",
    id: "",
  });
  const [selectedSizeItem, setSelectedSizeItem] = useState<Item>({
    name: "",
    id: "",
  });
  const [selectedColorItem, setSelectedColorItem] = useState<Item>({
    name: "",
    id: "",
  });

  const { products, isError, isLoading } = useGetProducts();
  const { addProduct, isPending } = useAddProduct();
  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Products</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addProduct({
              name: product,
              categoryId: selectedItem.id,
              billboardId: selectedBillboardItem.id,
              sizeId: selectedSizeItem.id,
              colorId: selectedColorItem.id,
            });
            setProduct("");
          }}
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
            query="categories"
            url="category"
          />
          <DropDown
            selectedItem={selectedBillboardItem}
            setSelectedItem={setSelectedBillboardItem}
            query="billboards"
            url="billboard"
          />
          <DropDown
            selectedItem={selectedSizeItem}
            setSelectedItem={setSelectedSizeItem}
            query="sizes"
            url="size"
          />
          <DropDown
            selectedItem={selectedColorItem}
            setSelectedItem={setSelectedColorItem}
            query="colors"
            url="color"
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
          <SectionContainer
            title="Products"
            headings={[
              "Product",
              "Category",
              "Billboard",
              "Size",
              "Color",
              "Username",
            ]}
            data={products}
          />
        )}
      </div>
    </div>
  );
};
