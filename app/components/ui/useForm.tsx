import { FormEvent, useState } from "react";

interface useFormProps {
  initialValues: Record<string, any>;
}

export const useForm = (props: useFormProps) => {
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
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    console.log(values);
    setValues(props.initialValues);
  };

  return {
    values,
    handleClick,
    handleImages,
    handleChange,
    handleDropdown,
    handleCheckBox,
  };
};
