import { PayloadType } from "@/types/types";
import { useUpdateQuery } from "@/app/hooks/useUpdateQuery";
import { useAddQuery } from "@/app/hooks/useAddQuery";
import {
  UpdateBillboardPayload,
  billboardPayload,
} from "@/app/lib/validators/Billboard";
import {
  AddQueryProps,
  UpdatePayload,
  UpdateQueryProps,
  ValidateTypePayload,
} from "@/types/types";
import { FormEvent, useState } from "react";

interface useFormProps<T> {
  initialValues: Record<string, any>;
  initialErrors: Record<string, any>;
  options: AddQueryProps<T> | UpdateQueryProps<T>;
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

  const {
    add,
    isPending: isAddPending,
    isError: isAddError,
    error: addError,
  } = useAddQuery({
    ...(props.options as AddQueryProps<ValidateTypePayload>),
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
    ...(props.options as UpdateQueryProps<UpdatePayload>),
  });
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    const validatedData = billboardPayload.safeParse(values);
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
