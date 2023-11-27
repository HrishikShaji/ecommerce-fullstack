"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import ImageUploader from "./ui/ImageUploader";
import { useForm } from "./ui/useForm";
import {
  BillboardPayload,
  billboardPayload,
} from "../lib/validators/Billboard";

const initialValues: BillboardPayload = {
  name: "",
  images: [],
};
const BillboardForm = () => {
  const {
    values,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
    handleImages,
  } = useForm({
    action: "Add",
    initialValues: initialValues,
    options: {
      endpoint: "billboard",
      queryKey: "billboards",
      validator: billboardPayload,
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
        <ImageUploader
          value={values.images}
          label="Image"
          onChange={(values) => handleImages("images", values)}
        />
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default BillboardForm;
