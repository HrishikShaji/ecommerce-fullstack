"use client";

import InputField from "./ui/InputField";
import Button from "./ui/Button";
import { useForm } from "./ui/hooks/useForm";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import { StorePayload, storePayload } from "../lib/validators/store";
import { useParams } from "next/navigation";

const initialValues: StorePayload = {
  name: "",
};

const initialErrors = {
  name: "",
};

const StoreForm = () => {
  const { userId } = useParams();
  const {
    values,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
    errors,
  } = useForm({
    validator: storePayload,
    action: "Add",
    initialValues: initialValues,
    initialErrors: initialErrors,
    options: {
      endpoint: `${userId}/store`,
      queryKey: "store",
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
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button label="Add" isPending={isPending} />
    </form>
  );
};

export default StoreForm;
