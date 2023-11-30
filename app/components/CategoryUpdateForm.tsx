"use client";

import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { CategoryChild } from "@/types/types";
import {
  UpdateCategoryPayload,
  updateCategoryPayload,
} from "../lib/validators/category";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";

interface CategoryUpdateFormProps {
  data: CategoryChild;
}

const initialErrors = {
  name: "",
};

export const CategoryUpdateForm: React.FC<CategoryUpdateFormProps> = (
  props,
) => {
  const {
    values,
    errors,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
  } = useForm({
    initialErrors: initialErrors,
    validator: updateCategoryPayload,
    action: "Update",
    initialValues: {
      name: props.data.name,
      id: props.data.id,
    } as UpdateCategoryPayload,
    options: {
      endpoint: "category",
      queryKey: "categories",
      validator: updateCategoryPayload,
    },
  });

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex flex-col gap-2 justify-start items-end">
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
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Update" isPending={isPending} />
    </form>
  );
};
