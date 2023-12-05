"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { useForm } from "./ui/hooks/useForm";
import { CategoryPayload, categoryPayload } from "../lib/validators/category";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import ImageUploader from "./ui/ImageUploader";

const initialValues: CategoryPayload = {
  name: "",
  images: [],
};
const initialErrors = {
  name: "",
  images: "",
};
const CategoryForm = () => {
  const {
    values,
    isError,
    isPending,
    error,
    errors,
    handleClick,
    handleChange,
    handleImages,
  } = useForm({
    validator: categoryPayload,
    initialErrors: initialErrors,
    action: "Add",
    initialValues: initialValues,
    options: {
      endpoint: "category",
      queryKey: "categories",
    },
  });
  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex gap-2 ">
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
          <ImageUploader
            value={values.images}
            label="Image"
            onChange={(values) => handleImages("images", values)}
          />
          <ErrorMessageForm value={errors.images} />
        </div>
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default CategoryForm;
