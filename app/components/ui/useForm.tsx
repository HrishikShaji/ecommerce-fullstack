import { useAddQuery } from "@/app/lib/queries/customQuery";
import { PayloadType } from "@/app/lib/utils";
import { QueryKey } from "@/types/types";
import { FormEvent, useState } from "react";

type AddQueryOptions = {
  endpoint: string;
  queryKey: QueryKey;
  validator: (inputs: PayloadType) => typeof inputs;
};

interface useFormProps {
  initialValues: Record<string, any>;
  options: AddQueryOptions;
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

  const { add, isPending, isError, error } = useAddQuery({
    ...props.options,
    reset: () => {
      setValues(props.initialValues);
    },
  });
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    add(values as PayloadType);
  };

  return {
    values,
    handleClick,
    handleImages,
    handleChange,
    handleDropdown,
    handleCheckBox,
    isPending,
    isError,
    error,
  };
};
