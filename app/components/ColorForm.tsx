"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { useForm } from "./ui/useForm";
import { ColorPayload, colorPayload } from "../lib/validators/color";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";

const initialValues: ColorPayload = {
  name: "",
  hexCode: "",
};

const initialErrors = {
  name: "",
  hexCode: "",
};
const ColorForm = () => {
  const {
    values,
    errors,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
  } = useForm({
    validator: colorPayload,
    initialErrors: initialErrors,
    action: "Add",
    initialValues: initialValues,
    options: {
      endpoint: "color",
      queryKey: "colors",
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
          <InputField
            validator={""}
            value={values.hexCode}
            onChange={(value) => handleChange("hexCode", value)}
            placeholder="hexCode"
            type="text"
            label="HexCode"
          />
          <ErrorMessageForm value={errors.hexCode} />
        </div>
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default ColorForm;
