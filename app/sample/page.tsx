"use client";

import { FormEvent, useState } from "react";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Dropdown from "../components/ui/Dropdown";

const Page = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
    dropOne: "",
  });

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  const handleDropdown = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(values);
  };
  return (
    <div className="min-h-screen w-full flex items-center bg-neutral-600 justify-center">
      <InputField
        validator={""}
        value={values.name}
        onChange={(value) => handleChange("name", value)}
        placeholder="name"
        type="text"
        label="Name"
      />
      <InputField
        validator={""}
        value={values.email}
        onChange={(value) => handleChange("email", value)}
        placeholder="email"
        type="email"
        label="Email"
      />
      <InputField
        validator={""}
        value={values.number}
        onChange={(value) => handleChange("number", value)}
        placeholder="number"
        type="number"
        label="Number"
      />
      <Dropdown
        placeholder="Select"
        value={values.dropOne}
        onChange={(value) => handleDropdown("dropOne", value)}
        data={[
          { value: 1, label: "momo" },
          { value: 2, label: "soso" },
          { value: 3, label: "koko" },
        ]}
      />
      <Button onClick={handleClick} value="Submit" />
    </div>
  );
};

export default Page;
