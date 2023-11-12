"use client";
import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import { DropDown } from "./DropDown";
import { useAddProduct, useGetProducts } from "../lib/queries/product";
import { SectionContainer } from "./SectionContainer";
import { Form, InputItem } from "./Form";

type Item = {
  name: string;
  id: string;
};

export const ProductSection = () => {
  const [product, setProduct] = useState("");
  const [page, setPage] = useState(1);
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
      name: "categoryId",
    },
    {
      label: "Billboard",
      selectedItem: selectedBillboardItem,
      setSelectedItem: setSelectedBillboardItem,
      url: "billboard",
      query: "billboards",
      name: "billboardId",
    },
    {
      label: "Size",
      selectedItem: selectedSizeItem,
      setSelectedItem: setSelectedSizeItem,
      url: "size",
      query: "sizes",
      name: "sizeId",
    },
    {
      label: "Color",
      selectedItem: selectedColorItem,
      setSelectedItem: setSelectedColorItem,
      url: "color",
      query: "colors",
      name: "colorId",
    },
  ];

  const values: InputItem[] = [
    {
      label: "Product",
      name: "name",
      value: product,
      placeholder: "eg: shoes",
      onChange: setProduct,
    },
  ];
  const { products, refetch, count, isError, isLoading } = useGetProducts(page);
  useEffect(() => {
    refetch();
  }, [page]);
  const { addProduct, isPending } = useAddProduct();
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Products</h1>
        <Form
          dropdownValues={dropDownValues}
          values={values}
          apiFunction={addProduct}
          isPending={isPending}
        />
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <SectionContainer
            count={count}
            title="Products"
            headings={[
              "Product",
              "Category",
              "Billboard",
              "Size",
              "Color",
              "Username",
            ]}
            setPage={setPage}
            page={page}
            data={products}
          />
        )}
      </div>
    </div>
  );
};
