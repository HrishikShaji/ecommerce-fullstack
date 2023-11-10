"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { DropDown } from "./DropDown";
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

  const dropDownValues = [
    {
      label: "Category",
      selectedItem: selectedItem,
      setSelectedItem: setSelectedItem,
      url: "category",
      query: "categories",
    },
    {
      label: "Billboard",
      selectedItem: selectedBillboardItem,
      setSelectedItem: setSelectedBillboardItem,
      url: "billboard",
      query: "billboards",
    },
    {
      label: "Size",
      selectedItem: selectedSizeItem,
      setSelectedItem: setSelectedSizeItem,
      url: "size",
      query: "sizes",
    },
    {
      label: "Color",
      selectedItem: selectedColorItem,
      setSelectedItem: setSelectedColorItem,
      url: "color",
      query: "colors",
    },
  ];

  const { products, isError, isLoading } = useGetProducts();
  const { addProduct, isPending } = useAddProduct();
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Products</h1>
        <form
          className="flex gap-2 items-end justify-around"
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
          <div className="flex flex-col gap-2">
            <label>Product Name</label>

            <input
              value={product}
              className="p-1 text-black rounded-md focus:outline-none placeholder-gray-600"
              placeholder="eg : shoes"
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          {dropDownValues.map((item, i) => (
            <div key={i} className="flex flex-col gap-2 w-full">
              <label>{item.label}</label>
              <DropDown
                selectedItem={item.selectedItem}
                setSelectedItem={item.setSelectedItem}
                query={item.query}
                url={item.url}
              />
            </div>
          ))}
          <button
            type="submit"
            className="py-1 px-3 bg-white text-black rounded-md"
          >
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
