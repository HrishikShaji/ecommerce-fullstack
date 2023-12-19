import { UpdateBillboardPayload } from "@/app/lib/validators/Billboard";
import { ValidateTypePayload } from "@/types/types";
import { FormEvent, useState } from "react";

interface useCustomFormProps<T> {
  initialValues: Record<string, any>;
}

export const useCustomForm = <
  T extends ValidateTypePayload | UpdateBillboardPayload,
>(
  props: useCustomFormProps<T>,
) => {
  const [values, setValues] = useState(props.initialValues);
  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDropdown = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckBox = (key: string, value: boolean) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleImages = (key: string, values: string[]) => {
    setValues((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  console.log(values);

  return {
    values,
    handleImages,
    handleChange,
    handleDropdown,
    handleCheckBox,
  };
};
