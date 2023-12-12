"use client";

import { useParams } from "next/navigation";
import { ProductPayload, productPayload } from "../lib/validators/Product";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import ImageUploader from "./ui/ImageUploader";
import InputField from "./ui/InputField";
import { useForm } from "./ui/hooks/useForm";

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
};
const ProductForm = () => {
  const { userId, storeId } = useParams();
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
          <ImageUploader
            value={values.images}
            label="Image"
            onChange={(values) => handleImages("images", values)}
          />
          <ErrorMessageForm value={errors.images} />
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
          <InputField
            validator={""}
            value={values.stock}
            onChange={(value) => handleChange("stock", value)}
            placeholder="stock"
            type="number"
            label="Stock"
          />
          <ErrorMessageForm value={errors.stock} />
        </div>
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default ProductForm;
