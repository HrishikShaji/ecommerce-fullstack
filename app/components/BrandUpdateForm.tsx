"use client";

import { Brand, Size } from "@prisma/client";
import { useForm } from "./ui/hooks/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { UpdateSizePayload, updateSizePayload } from "../lib/validators/size";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import {
  UpdateBrandPayload,
  updateBrandPayload,
} from "../lib/validators/brand";

interface BrandUpdateFormProps {
  data: Brand;
}

const initialErrors = {
  name: "",
};
export const BrandUpdateForm: React.FC<BrandUpdateFormProps> = (props) => {
  const {
    values,
    errors,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
  } = useForm({
    validator: updateBrandPayload,
    initialErrors: initialErrors,
    action: "Update",
    initialValues: {
      name: props.data.name,
      id: props.data.id,
    } as UpdateBrandPayload,
    options: {
      endpoint: "brand",
      queryKey: "brands",
    },
  });

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
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
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Update" isPending={isPending} />
    </form>
  );
};
