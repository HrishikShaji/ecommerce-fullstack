"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { useForm } from "./ui/useForm";
import { ColorPayload, colorPayload } from "../lib/validators/color";

const initialValues: ColorPayload = {
  name: "",
};
const ColorForm = () => {
  const { values, isError, isPending, error, handleClick, handleChange } =
    useForm({
      action: "Add",
      initialValues: initialValues,
      options: {
        endpoint: "color",
        queryKey: "colors",
        validator: colorPayload,
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

export default ColorForm;
