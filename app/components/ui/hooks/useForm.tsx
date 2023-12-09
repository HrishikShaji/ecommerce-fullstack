import { PayloadType } from "@/types/types";
import { UpdateQueryProps, useUpdateQuery } from "@/app/hooks/useUpdateQuery";
import { AddQueryProps, useAddQuery } from "@/app/hooks/useAddQuery";
import { UpdateBillboardPayload } from "@/app/lib/validators/Billboard";
import { ValidateTypePayload } from "@/types/types";
import { FormEvent, useState } from "react";
import { ValidationSchema } from "@/app/lib/utils";

interface useFormProps<T> {
  initialValues: Record<string, any>;
  initialErrors: Record<string, any>;
  validator: ValidationSchema<T>;
  options: AddQueryProps | UpdateQueryProps;
  action: "Add" | "Update";
}

export const useForm = <T extends ValidateTypePayload | UpdateBillboardPayload>(
  props: useFormProps<T>,
) => {
  const [values, setValues] = useState(props.initialValues);
  const [errors, setErrors] = useState(props.initialErrors);
  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDropdown = (key: string, value: string) => {
    console.log(key, value);
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
    console.log(key, values);
    setValues((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const {
    add,
    isPending: isAddPending,
    isError: isAddError,
    error: addError,
  } = useAddQuery({
    ...(props.options as AddQueryProps),
    reset: () => {
      setValues(props.initialValues);
    },
  });

  const {
    update,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateQuery({
    ...(props.options as UpdateQueryProps),
  });
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const validatedData = props.validator.safeParse(values);
    if (!validatedData.success) {
      const newErrors: Record<string, any> = {};
      validatedData.error.errors.map(
        (error) => (newErrors[error.path[0]] = error.message),
        setErrors(newErrors),
      );
      return;
    }
    setErrors(props.initialErrors);
    if (props.action === "Add") {
      add(values as PayloadType);
    }

    if (props.action === "Update") {
      update(values as UpdateBillboardPayload);
    }
  };

  const isPending = props.action === "Add" ? isAddPending : isUpdatePending;
  const isError = props.action === "Add" ? isAddError : isUpdateError;
  const error = props.action === "Add" ? addError : updateError;

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
    errors,
  };
};
