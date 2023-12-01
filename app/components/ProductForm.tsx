"use client";

import { productPayload } from "../lib/validators/Product";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import InputField from "./ui/InputField";
import { useForm } from "./ui/useForm";

const initialValues = {
  name: "",
  billboardId: "",
  categoryId: "",
  sizeId: "",
  colorId: "",
};
const initialErrors = {
  name: "",
  billboardId: "",
  categoryId: "",
  sizeId: "",
  colorId: "",
};
const ProductForm = () => {
  const {
    values,
    handleClick,
    isError,
    isPending,
    error,
    handleDropdown,
    handleChange,
    errors,
  } = useForm({
    initialErrors: initialErrors,
    validator: productPayload,
    initialValues: initialValues,
    options: {
      endpoint: "product",
      queryKey: "products",
    },
    action: "Add",
  });
  return (
    <form onSubmit={handleClick} className="">
      <div className="grid grid-cols-3 gap-4">
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
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default ProductForm;
