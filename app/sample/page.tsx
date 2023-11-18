"use client";

import { useState } from "react";
import { CustomForm } from "../components/CustomForm";
import { EndpointType, QueryKey } from "@/types/types";
import {
  FinalInputType,
  inputValuesData,
  productInputInitialObj,
  productInputValues,
} from "../lib/data";

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

const Page = () => {
  const [formData, setFormData] = useState<Record<string, any>>(
    productInputInitialObj,
  );
  const data = productInputValues.map((input) => {
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
        inputValues={data as FinalInputType[]}
      />
    </div>
  );
};

export default Page;
