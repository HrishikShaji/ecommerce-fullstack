import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { EndpointType, QueryKey, SearchType } from "@/types/types";
import { CustomDropDown } from "./CustomDropDown";
import { FinalInputType, productInputInitialObj } from "../lib/data";

interface CustomFormProps {
  inputValues: FinalInputType[];
  setFormData: Dispatch<SetStateAction<Record<string, any>>>;
  formData: Record<string, any>;
  refetch: () => void;
  apiFunction: (values: any) => void;
}

export const CustomForm: React.FC<CustomFormProps> = ({
  inputValues,
  setFormData,
  formData,
  refetch,
  apiFunction,
}) => {
  const [resetClick, setResetClick] = useState(0);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = apiFunction(formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
      setFormData(productInputInitialObj);
      setResetClick((prev) => prev + 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="p-10 bg-gray-500 h-[50vh]" onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        {inputValues.map((input, i) =>
          input.type === "Input" ? (
            <InputItem key={i} inputItem={input} handleChange={handleChange} />
          ) : (
            <CustomDropDown
              key={i}
              refetch={refetch}
              setFormData={setFormData}
              value={input.value}
              resetClick={resetClick}
              endpoint={input.endpoint as EndpointType}
              queryKey={input.queryKey as QueryKey}
            />
          ),
        )}
        <button type="submit" className="p-2 rounded-md bg-neutral-700">
          Submit
        </button>
      </div>
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
        className="p-2 rounded-md"
        {...inputProps}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
