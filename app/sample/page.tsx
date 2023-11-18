"use client";

import { useState } from "react";
import { CustomForm } from "../components/CustomForm";
import { EndpointType, QueryKey } from "@/types/types";
import { inputValuesData } from "../lib/data";

export type Item = {
  id: string;
  name: string;
};

export type InputType = {
  name: string;
  placeholder?: string;
  value: string;
  dropDownValue?: string;
  label: string;
  type: "Input" | "DropDown";
  endpoint?: EndpointType;
  queryKey?: QueryKey;
};
export type FormDataType = {
  name: string;
  age: string;
  birth: string;
  dropOne: Item;
  dropTwo: Item;
};

const initialFormObject = {
  name: "",
  age: "",
  birth: "",
};

const Page = () => {
  const [formData, setFormData] = useState<FormDataType>(initialFormObject);
  const data = inputValuesData.map((input) => {
    if (input.type === "Input") {
      const newObj = { ...input, value: formData[input.name] };
      return newObj;
    }
    if (input.type === "DropDown") {
      const newObj = { ...input, value: input.name };
      return newObj;
    }

    return input;
  });

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <CustomForm
        formData={formData}
        setFormData={setFormData}
        inputValues={data}
      />
    </div>
  );
};

export default Page;
