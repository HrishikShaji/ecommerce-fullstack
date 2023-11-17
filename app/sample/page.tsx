"use client";

import { useState } from "react";
import { CustomForm } from "../components/CustomForm";

export type InputType = {
  name: string;
  placeholder: string;
  value: string;
  label: string;
};
export type FormDataType = {
  name: string;
  age: string;
  birth: string;
};

const Page = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    age: "",
    birth: "",
  });
  const inputValues: InputType[] = [
    {
      name: "name",
      placeholder: "name...",
      value: formData.name,
      label: "Name",
    },
    {
      name: "age",
      placeholder: "age...",
      value: formData.age,
      label: "Age",
    },
    {
      name: "birth",
      placeholder: "birth...",
      value: formData.birth,
      label: "Birthday",
    },
  ];

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <CustomForm
        formData={formData}
        setFormData={setFormData}
        inputValues={inputValues}
      />
    </div>
  );
};

export default Page;
