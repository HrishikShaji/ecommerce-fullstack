import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { EndpointType, QueryKey, SearchType } from "@/types/types";
import { CustomDropDown } from "./CustomDropDown";
import { FinalInputType } from "../lib/data";

interface CustomFormProps {
  inputValues: FinalInputType[];
  setFormData: Dispatch<SetStateAction<Record<string, any>>>;
  formData: Record<string, any>;
}

export const CustomForm: React.FC<CustomFormProps> = ({
  inputValues,
  setFormData,
  formData,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
              setFormData={setFormData}
              value={input.value}
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
