"use client";

import { productPayload } from "../lib/validators/Product";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import InputField from "./ui/InputField";
import { useForm } from "./ui/useForm";

const initialValues = {
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
  } = useForm({
    initialValues: initialValues,
    options: {
      endpoint: "product",
      queryKey: "products",
      validator: productPayload,
    },
    action: "Add",
  });
  return (
    <form onSubmit={handleClick} className="">
      <div className="grid grid-cols-3 gap-4">
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
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default ProductForm;
