"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import Dropdown from "./ui/Dropdown";
import CheckBox from "./ui/CheckBox";
import ImageUploader from "./ui/ImageUploader";
import { useForm } from "./ui/useForm";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../lib/validators/Billboard";
import { ValidateTypePayload, Validator } from "@/types/types";

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
      validator: validateBillboardPayload as Validator<ValidateTypePayload>,
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
      <Button isPending={isPending} />
    </form>
  );
};

export default BillboardForm;
