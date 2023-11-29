"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { useForm } from "./ui/useForm";
import { CategoryPayload, categoryPayload } from "../lib/validators/category";

const initialValues: CategoryPayload = {
  name: "",
};
const CategoryForm = () => {
  const { values, isError, isPending, error, handleClick, handleChange } =
    useForm({
      action: "Add",
      initialValues: initialValues,
      options: {
        endpoint: "category",
        queryKey: "categories",
        validator: categoryPayload,
      },
    });
  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex gap-4 justify-start items-end">
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
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default CategoryForm;
