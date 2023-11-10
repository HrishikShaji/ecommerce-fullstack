import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./Button";

export type InputItem = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

interface FormProps {
  values: InputItem[];
  apiFunction: (values: any) => void;
  isPending: boolean;
}

export const Form: React.FC<FormProps> = ({
  values,
  apiFunction,
  isPending,
}) => {
  const [formData, setFormData] = useState({});
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    apiFunction(formData);
    values.forEach((item: InputItem) => {
      item.onChange("");
    });
  };
  return (
    <form onSubmit={onSubmit} className="flex gap-2 items-end">
      {values.map((value: InputItem, i: number) => (
        <FormItem key={i} value={value} setFormData={setFormData} />
      ))}
      <Button isPending={isPending} />
    </form>
  );
};

interface FormItemProps {
  value: InputItem;
  setFormData: (values: any) => void;
}

const FormItem: React.FC<FormItemProps> = ({ value, setFormData }) => {
  const { label, onChange, ...inputProps } = value;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData: any) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
    onChange(e.target.value);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white">{label}</label>
      <input
        {...inputProps}
        className="p-1  rounded-md text-black focus:outline-none placeholder-gray-600"
        onChange={handleChange}
      />
    </div>
  );
};
