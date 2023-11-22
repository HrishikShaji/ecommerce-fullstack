"use client";

import { useState } from "react";
import InputField from "../components/ui/InputField";

const Page = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    number: "",
  });

  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
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
    </div>
  );
};

export default Page;
