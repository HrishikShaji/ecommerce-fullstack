"use client";

import { BillBoard } from "@prisma/client";
import { UpdateTypePayload, Validator } from "@/types/types";
import { useUpdateQuery } from "../lib/queries/customQuery";
import { EndpointType, QueryKey, ValidateTypePayload } from "@/types/types";
import {
  BillboardPayload,
  UpdateBillboardPayload,
  validateBillboardPayload,
  validateUpdateBillboardPayload,
} from "../lib/validators/Billboard";
import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { ImageUpdate } from "./ui/ImageUpdate";

interface BillboardUpdateFormProps {
  data: BillBoard;
}

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
  } = useForm({
    action: "Update",
    initialValues: {
      name: props.data.name,
      images: props.data.images,
      id: props.data.id,
    } as UpdateBillboardPayload,
    options: {
      endpoint: "billboard",
      queryKey: "billboards",
      validator: validateUpdateBillboardPayload as Validator<UpdateTypePayload>,
    },
  });

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex flex-col gap-4 justify-start items-end">
        <ImageUpdate
          value={props.data.images}
          onChange={(values) => handleImages("images", values)}
        />
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
