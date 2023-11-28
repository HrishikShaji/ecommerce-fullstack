"use client";

import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { CategoryChild } from "@/types/types";
import {
  UpdateCategoryPayload,
  updateCategoryPayload,
} from "../lib/validators/category";

interface CategoryUpdateFormProps {
  data: CategoryChild;
}

export const CategoryUpdateForm: React.FC<CategoryUpdateFormProps> = (
  props,
) => {
  const { values, isError, isPending, error, handleClick, handleChange } =
    useForm({
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
      <div className="flex flex-col gap-4 justify-start items-end">
        <InputField
          validator={""}
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          placeholder="name"
          type="text"
          label="Name"
        />
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Update" isPending={isPending} />
    </form>
  );
};
