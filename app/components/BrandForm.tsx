"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { useForm } from "./ui/hooks/useForm";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import { BrandPayload, brandPayload } from "../lib/validators/brand";

const initialValues: BrandPayload = {
  name: "",
};

const initialErrors = {
  name: "",
};
const BrandForm = () => {
  const {
    values,
    isError,
    isPending,
    error,
    errors,
    handleClick,
    handleChange,
  } = useForm({
    validator: brandPayload,
    initialErrors: initialErrors,
    action: "Add",
    initialValues: initialValues,
    options: {
      endpoint: "brand",
      queryKey: "brands",
    },
  });
  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex flex-col  gap-2">
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
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default BrandForm;
