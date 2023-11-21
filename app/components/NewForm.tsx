import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { EndpointType, QueryKey } from "@/types/types";
import { FinalInputType, InputValuesDataType } from "../lib/data";
import { NewImageUploader } from "./NewImageUploader";
import { NewDropDown } from "./NewDropDown";

interface NewFormProps {
  inputValues: InputValuesDataType[];
  initialFormData: Record<string, any>;
}

export const NewForm = (props: NewFormProps) => {
  const [formData, setFormData] = useState(props.initialFormData);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("submitted");
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
        {props.inputValues.map((input, i) =>
          input.type === "Input" ? (
            <InputItem key={i} inputItem={input} handleChange={handleChange} />
          ) : input.type === "Image" ? (
            <NewImageUploader
              key={i}
              setFormData={setFormData}
              value={input.value}
              label={input.label as string}
            />
          ) : (
            <NewDropDown
              key={i}
              setFormData={setFormData}
              value={input.value}
              endpoint={input.endpoint as EndpointType}
              queryKey={input.queryKey as QueryKey}
              label={input.label as string}
            />
          ),
        )}
      </div>
      <button className="p-2 rounded-md bg-white">Add</button>
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
