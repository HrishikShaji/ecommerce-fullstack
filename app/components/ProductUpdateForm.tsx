"use client";

import { useForm } from "./ui/hooks/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import {
  UpdateProductPayload,
  updateProductPayload,
} from "../lib/validators/Product";
import { ProductChild } from "@/types/types";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import { ImageUpdate } from "./ui/ImageUpdate";

interface ProductUpdateFormProps {
  data: ProductChild;
}

const initialErrors = {
  name: "",
  billboardId: "",
  categoryId: "",
  sizeId: "",
  colorId: "",
  images: "",
  price: "",
};
export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = (props) => {
  const {
    values,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
    handleDropdown,
    handleImages,
    errors,
  } = useForm({
    initialErrors: initialErrors,
    validator: updateProductPayload,
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
    },
  });

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 justify-start items-end">
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
            value={values.price}
            onChange={(value) => handleChange("price", value)}
            placeholder="price"
            type="number"
            label="Price"
          />
          <ErrorMessageForm value={errors.price} />
        </div>
        <div className="flex flex-col gap-2">
          <Dropdown
            endpoint="billboard"
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
        <div className="flex flex-col gap-2">
          <Dropdown
            endpoint="size"
            queryKey="sizes"
            placeholder="Select"
            value={values.sizeId}
            onChange={(value) => handleDropdown("sizeId", value)}
            label="Size"
          />
          <ErrorMessageForm value={errors.sizeId} />
        </div>
        <div className="flex flex-col gap-2">
          <Dropdown
            endpoint="color"
            queryKey="colors"
            placeholder="Select"
            value={values.colorId}
            onChange={(value) => handleDropdown("colorId", value)}
            label="Color"
          />
          <ErrorMessageForm value={errors.colorId} />
        </div>
        <div className="flex flex-col gap-2">
          <ImageUpdate
            value={props.data.images}
            onChange={(values) => handleImages("images", values)}
          />
          <ErrorMessageForm value={errors.images} />
        </div>
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Update" isPending={isPending} />
    </form>
  );
};
