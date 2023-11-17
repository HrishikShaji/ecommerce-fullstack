import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { FormDataType, InputType } from "../sample/page";

interface CustomFormProps {
  inputValues: InputType[];
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
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
    console.log(e.target.value);
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="p-10 bg-gray-500" onSubmit={handleSubmit}>
      {inputValues.map((input, i) => (
        <InputItem key={i} inputItem={input} handleChange={handleChange} />
      ))}
      <button>Submit</button>
    </form>
  );
};

interface InputItemProps {
  inputItem: InputType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputItemProps> = ({ inputItem, handleChange }) => {
  const { label, ...inputProps } = inputItem;
  return (
    <div>
      <label>{inputItem.label}</label>
      <input {...inputProps} onChange={(e) => handleChange(e)} />
    </div>
  );
};
