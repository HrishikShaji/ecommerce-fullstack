"use client";

import { BillBoard, Product } from "@prisma/client";
import {
  UpdateBillboardPayload,
  updateBillboardPayload,
} from "../lib/validators/Billboard";
import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { ImageUpdate } from "./ui/ImageUpdate";
import Dropdown from "./ui/Dropdown";
import {
  UpdateProductPayload,
  updateProductPayload,
} from "../lib/validators/Product";
import { ProductChild } from "@/types/types";

interface ProductUpdateFormProps {
  data: ProductChild;
}

export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = (props) => {
  const {
    values,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
    handleDropdown,
  } = useForm({
    action: "Update",
    initialValues: {
      name: props.data.name,
      id: props.data.id,
      billboardId: props.data.billoardId,
      categoryId: props.data.categoryId,
      sizeId: props.data.sizeId,
      colorId: props.data.colorId,
    } as UpdateProductPayload,
    options: {
      endpoint: "product",
      queryKey: "products",
      validator: updateProductPayload,
    },
  });
  console.log(props.data);

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex flex-col gap-4 justify-start items-end">
        <InputField
          validator={""}
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          placeholder="name"
          type="text"
          label="Name"
        />
        <Dropdown
          endpoint="billboard"
          queryKey="billboards"
          placeholder="Select"
          value={values.billboardId}
          onChange={(value) => handleDropdown("billboardId", value)}
          label="Billboard"
        />
        <Dropdown
          endpoint="category"
          queryKey="categories"
          placeholder="Select"
          value={values.categoryId}
          onChange={(value) => handleDropdown("categoryId", value)}
          label="Category"
        />
        <Dropdown
          endpoint="size"
          queryKey="sizes"
          placeholder="Select"
          value={values.sizeId}
          onChange={(value) => handleDropdown("sizeId", value)}
          label="Size"
        />
        <Dropdown
          endpoint="color"
          queryKey="colors"
          placeholder="Select"
          value={values.colorId}
          onChange={(value) => handleDropdown("colorId", value)}
          label="Color"
        />
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Update" isPending={isPending} />
    </form>
  );
};
