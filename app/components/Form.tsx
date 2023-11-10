import { ChangeEvent, FormEvent, useState, useRef } from "react";
import { Button } from "./Button";

interface FormProps {
  values: any;
  apiFunction: (values: any) => void;
  isPending: boolean;
}

export const Form: React.FC<FormProps> = ({
  values,
  apiFunction,
  isPending,
}) => {
  const [formData, setFormData] = useState({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    apiFunction(formData);
    formRef.current?.reset();
  };
  return (
    <form ref={formRef} onSubmit={onSubmit} className="flex gap-2 items-end">
      {values.map((value: any, i: number) => (
        <FormItem key={i} values={value} setFormData={setFormData} />
      ))}
      <Button isPending={isPending} />
    </form>
  );
};

interface FormItemProps {
  values: any;
  setFormData: (values: any) => void;
}

const FormItem: React.FC<FormItemProps> = ({ values, setFormData }) => {
  const { label, onChange, ...inputProps } = values;
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
