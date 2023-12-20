"use client";

import { useParams } from "next/navigation";
import { ProductPayload, productPayload } from "../lib/validators/Product";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import ImageUploader from "./ui/ImageUploader";
import InputField from "./ui/InputField";
import { useForm } from "./ui/hooks/useForm";
import { VariantSection } from "./VariantSection";
import { useState } from "react";

const initialValues: ProductPayload = {
  name: "",
  billboardId: "",
  categoryId: "",
  sizeId: "",
  colorId: "",
  images: [],
  price: 0,
  stock: 0,
  brandId: "",
  discount: 0,
  slug: "",
};
const initialErrors = {
  name: "",
  billboardId: "",
  categoryId: "",
  sizeId: "",
  colorId: "",
  images: "",
  price: "",
  stock: "",
  brandId: "",
  discount: "",
  slug: "",
};
const ProductForm = () => {
  const { userId, storeId } = useParams();
  const [noOfVariants, setNoOfVariants] = useState(1);
  const [variants, setVariants] = useState<any[]>([]);
  const {
    values,
    handleClick,
    isError,
    isPending,
    error,
    handleDropdown,
    handleChange,
    handleImages,
    errors,
  } = useForm({
    initialErrors: initialErrors,
    validator: productPayload,
    initialValues: initialValues,
    options: {
      endpoint: `${userId}/store/${storeId}/product`,
      queryKey: "products",
    },
    action: "Add",
  });

  console.log("variants are", variants);
  return (
    <>
      <form onSubmit={handleClick} className="">
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col gap-2">
            <InputField
              validator={""}
              value={values.name}
              onChange={(value) => handleChange("name", value)}
              placeholder="name"
              type="text"
              label="Name"
            />
            <ErrorMessageForm value={errors.name} />
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              validator={""}
              value={values.slug}
              onChange={(value) => handleChange("slug", value)}
              placeholder="slug"
              type="text"
              label="Slug"
            />
            <ErrorMessageForm value={errors.slug} />
          </div>
          <div className="flex flex-col gap-2">
            <Dropdown
              endpoint="brand"
              queryKey="brands"
              placeholder="Select"
              value={values.brandId}
              onChange={(value) => handleDropdown("brandId", value)}
              label="Brand"
            />
            <ErrorMessageForm value={errors.brandId} />
          </div>
          <div className="flex flex-col gap-2">
            <Dropdown
              endpoint={`${userId}/store/${storeId}/billboard`}
              queryKey="billboards"
              placeholder="Select"
              value={values.billboardId}
              onChange={(value) => handleDropdown("billboardId", value)}
              label="Billboard"
            />
            <ErrorMessageForm value={errors.billboardId} />
          </div>
          <div className="flex flex-col gap-2">
            <Dropdown
              endpoint="category"
              queryKey="categories"
              placeholder="Select"
              value={values.categoryId}
              onChange={(value) => handleDropdown("categoryId", value)}
              label="Category"
            />
            <ErrorMessageForm value={errors.categoryId} />
          </div>
        </div>
        <button
          type="button"
          className="p-2 rounded-md bg-neutral-600"
          onClick={() => setNoOfVariants((prev) => prev + 1)}
        >
          New
        </button>
        {Array.from({ length: noOfVariants }).map((_, i) => (
          <VariantSection key={i} setVariants={setVariants} index={i} />
        ))}
        {isError && <h1 className="text-red-500">{error?.message}</h1>}
        <Button label="Add" isPending={isPending} />
      </form>
    </>
  );
};

export default ProductForm;
