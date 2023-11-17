"use client";

import { useState } from "react";
import { CustomForm } from "../components/CustomForm";
import { Record } from "@prisma/client/runtime/library";

export type Item = {
  id: string;
  name: string;
};

export type InputType = {
  name: string;
  placeholder?: string;
  value?: string;
  dropDownValue?: string;
  label: string;
  type: "Input" | "DropDown";
  dropDownValues?: Item[];
};
export type FormDataType = {
  name: string;
  age: string;
  birth: string;
  dropOne: Item;
  dropTwo: Item;
};

const dropOneValues = [
  { id: "123", name: "loki" },
  { id: "456", name: "thor" },
  { id: "789", name: "odin" },
];
const dropTwoValues = [
  { id: "001", name: "cap" },
  { id: "002", name: "tony" },
  { id: "003", name: "hulk" },
];
const Page = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    age: "",
    birth: "",
    dropOne: { id: "", name: "" },
    dropTwo: { id: "", name: "" },
  });
  const inputValues: InputType[] = [
    {
      name: "name",
      placeholder: "name...",
      value: formData.name,
      label: "Name",
      type: "Input",
    },
    {
      name: "age",
      placeholder: "age...",
      value: formData.age,
      label: "Age",
      type: "Input",
    },
    {
      name: "birth",
      placeholder: "birth...",
      value: formData.birth,
      label: "Birthday",
      type: "Input",
    },
    {
      name: "dropyyy",
      placeholder: "age...",
      dropDownValue: "dropOne",
      label: "dropyyy",
      type: "DropDown",
      dropDownValues: dropOneValues,
    },
    {
      name: "dropuuuu",
      placeholder: "drop...",
      dropDownValue: "dropTwo",
      label: "Birthday",
      type: "DropDown",
      dropDownValues: dropTwoValues,
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
