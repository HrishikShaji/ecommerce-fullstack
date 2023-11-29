"use client";

import { Size } from "@prisma/client";
import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { UpdateSizePayload, updateSizePayload } from "../lib/validators/size";

interface SizeUpdateFormProps {
  data: Size;
}

export const SizeUpdateForm: React.FC<SizeUpdateFormProps> = (props) => {
  const { values, isError, isPending, error, handleClick, handleChange } =
    useForm({
      action: "Update",
      initialValues: {
        name: props.data.name,
        id: props.data.id,
      } as UpdateSizePayload,
      options: {
        endpoint: "size",
        queryKey: "sizes",
        validator: updateSizePayload,
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
