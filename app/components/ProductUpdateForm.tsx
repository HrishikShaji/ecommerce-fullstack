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
import { useParams } from "next/navigation";
import { useGetQuery } from "../hooks/useGetQuery";
import { Spinner } from "./ui/Spinner";

interface ProductUpdateFormProps {
  productId: string;
}

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
export const ProductUpdateForm: React.FC<ProductUpdateFormProps> = (props) => {
  const { userId, storeId } = useParams();

  const { data, isLoading, isError } = useGetQuery({
    endpoint: `products/${props.productId}`,
    queryKeys: ["product"],
    page: 1,
    sort: "LATEST",
  });

  const {
    values,
    isError: isFormError,
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
      name: data?.name,
      id: data?.id,
      billboardId: data?.billboardId,
      categoryId: data?.categoryId,
      brandId: data?.brandId,
      slug: data?.slug,
      variants: data?.variants,
    } as UpdateProductPayload,
    options: {
      endpoint: `${userId}/store/${storeId}/product`,
      queryKey: "products",
    },
  });

  if (isLoading) return <Spinner />;

  console.log(data);

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="grid grid-cols-6 gap-4 justify-start items-end">
        <div className="flex flex-col gap-2">
          <InputField
            validator={""}
            value={data?.name}
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
            value={data?.slug}
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
            item={{ label: data?.brand.name, id: data?.brandId }}
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
            item={{ label: data?.billboard.name, id: data?.billboardId }}
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
            item={{ label: data?.category.name, id: data?.categoryId }}
            onChange={(value) => handleDropdown("categoryId", value)}
            label="Category"
          />
          <ErrorMessageForm value={errors.categoryId} />
        </div>
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Update" isPending={isPending} />
    </form>
  );
};
