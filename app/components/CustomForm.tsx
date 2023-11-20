import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { EndpointType, QueryKey } from "@/types/types";
import { CustomDropDown } from "./CustomDropDown";
import { FinalInputType, productInputInitialObj } from "../lib/data";
import { Button } from "./Button";
import { ImageUploader } from "./ImageUploader";

interface CustomFormProps {
  inputValues: FinalInputType[];
  setFormData: Dispatch<SetStateAction<Record<string, any>>>;
  formData: Record<string, any>;
  refetch: () => void;
  apiFunction: (values: any) => void;
  isPending: boolean;
  isError: boolean;
  error: Error;
}

export const CustomForm: React.FC<CustomFormProps> = ({
  inputValues,
  setFormData,
  formData,
  refetch,
  apiFunction,
  isPending,
  isError,
  error,
}) => {
  const [resetClick, setResetClick] = useState(0);

  useEffect(() => {
    if (!isError) {
      setFormData(productInputInitialObj);
      setResetClick((prev) => prev + 1);
    }
  }, [isError]);
  console.log(formData);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submitted");
    apiFunction(formData);
    refetch();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="flex flex-col gap-2 items-start " onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        {inputValues.map((input, i) =>
          input.type === "Input" ? (
            <InputItem key={i} inputItem={input} handleChange={handleChange} />
          ) : input.type === "Image" ? (
            <ImageUploader
              key={i}
              setFormData={setFormData}
              value={input.value}
              label={input.label as string}
              resetClick={resetClick}
            />
          ) : (
            <CustomDropDown
              key={i}
              setFormData={setFormData}
              value={input.value}
              resetClick={resetClick}
              endpoint={input.endpoint as EndpointType}
              queryKey={input.queryKey as QueryKey}
              label={input.label as string}
            />
          ),
        )}
      </div>
      {isError && <h1 className="text-red-500">{error.message}</h1>}
      <Button isPending={isPending} />
    </form>
  );
};

interface InputItemProps {
  inputItem: FinalInputType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputItemProps> = ({ inputItem, handleChange }) => {
  const { label, ...inputProps } = inputItem;
  return (
    <div className="flex flex-col gap-2">
      <label>{inputItem.label}</label>
      <input
        className="p-2 rounded-md text-black"
        {...inputProps}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
