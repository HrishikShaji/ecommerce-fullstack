import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { DropDown } from "./DropDown";
import { DropdownInputItem, InputItem } from "@/types/types";

interface FormProps {
  values: InputItem[];
  apiFunction: (values: any) => void;
  isPending: boolean;
  dropdownValues?: DropdownInputItem[];
}

export const Form: React.FC<FormProps> = ({
  values,
  apiFunction,
  isPending,
  dropdownValues,
}) => {
  const [formData, setFormData] = useState({});
  const updateDropdownValuesInFormData = () => {
    let updatedFormData = { ...formData };

    dropdownValues?.forEach((item) => {
      updatedFormData = {
        ...updatedFormData,
        [item.name]: item.selectedItem.id,
      };
    });

    setFormData(updatedFormData);
  };

  useEffect(() => {
    updateDropdownValuesInFormData();
  }, [dropdownValues]);
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
      {dropdownValues &&
        dropdownValues.map((item: DropdownInputItem, i) => (
          <DropdownItem key={i} value={item} />
        ))}
      <Button isPending={isPending} />
    </form>
  );
};

interface DropdownItemProps {
  value: DropdownInputItem;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ value }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label>{value.label}</label>
      <DropDown
        selectedItem={value.selectedItem}
        setSelectedItem={value.setSelectedItem}
        query={value.query}
        url={value.url}
      />
    </div>
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
