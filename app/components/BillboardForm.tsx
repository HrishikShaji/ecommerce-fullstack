"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import ImageUploader from "./ui/ImageUploader";
import { useForm } from "./ui/hooks/useForm";
import {
  BillboardPayload,
  billboardPayload,
} from "../lib/validators/Billboard";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import { useParams } from "next/navigation";

const initialValues: BillboardPayload = {
  name: "",
  images: [],
};

const initialErrors = {
  name: "",
  images: "",
};

const BillboardForm = () => {
  const { userId, storeId } = useParams();
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
    action: "Add",
    initialValues: initialValues,
    initialErrors: initialErrors,
    options: {
      endpoint: `${userId}/store/${storeId}/billboard`,
      queryKey: "billboards",
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
        <ErrorMessageForm value={errors.name} />
        <ImageUploader
          index={1}
          value={values.images}
          label="Image"
          onChange={(values) => handleImages("images", values)}
        />
        <ErrorMessageForm value={errors.images} />
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default BillboardForm;
