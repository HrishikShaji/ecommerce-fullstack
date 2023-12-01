"use client";

import { BillBoard } from "@prisma/client";
import {
  UpdateBillboardPayload,
  billboardPayload,
  updateBillboardPayload,
} from "../lib/validators/Billboard";
import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { ImageUpdate } from "./ui/ImageUpdate";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";

interface BillboardUpdateFormProps {
  data: BillBoard;
}
const initialErrors = {
  name: "",
  images: "",
};

export const BillboardUpdateForm: React.FC<BillboardUpdateFormProps> = (
  props,
) => {
  const {
    values,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
    handleImages,
    errors,
  } = useForm({
    validator: billboardPayload,
    initialErrors: initialErrors,
    action: "Update",
    initialValues: {
      name: props.data.name,
      images: props.data.images,
      id: props.data.id,
    } as UpdateBillboardPayload,
    options: {
      endpoint: "billboard",
      queryKey: "billboards",
    },
  });

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex flex-col gap-4 justify-start items-end">
        <ImageUpdate
          value={props.data.images}
          onChange={(values) => handleImages("images", values)}
        />
        <ErrorMessageForm value={errors.images} />
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
