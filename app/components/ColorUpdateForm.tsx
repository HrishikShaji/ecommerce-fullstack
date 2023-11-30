"use client";

import { Color } from "@prisma/client";
import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import {
  UpdateColorPayload,
  updateColorPayload,
} from "../lib/validators/color";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";

interface ColorUpdateFormProps {
  data: Color;
}

const initialErrors = {
  name: "",
};

export const ColorUpdateForm: React.FC<ColorUpdateFormProps> = (props) => {
  const {
    values,
    errors,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
  } = useForm({
    validator: updateColorPayload,
    initialErrors: initialErrors,
    action: "Update",
    initialValues: {
      name: props.data.name,
      id: props.data.id,
    } as UpdateColorPayload,
    options: {
      endpoint: "color",
      queryKey: "colors",
      validator: updateColorPayload,
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
