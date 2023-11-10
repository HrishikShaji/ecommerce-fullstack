"use client";

import { useState } from "react";
import { Form } from "../components/Form";

const Page = () => {
  const [billboardName, setBillboardName] = useState("");
  const [billboardAge, setBillboardAge] = useState("");
  const values = [
    {
      label: "Billboard Name",
      name: "billboardName",
      value: billboardName,
      placeholder: "billboard name...",
      onChange: setBillboardName,
    },
    {
      label: "Billboard Age",
      name: "billboardAge",
      value: billboardAge,
      placeholder: "billboard age...",
      onChange: setBillboardAge,
    },
  ];

  return (
    <div className="h-screen w-full justify-center items-center">
      <Form values={values} apiFunction={() => {}} />
    </div>
  );
};

export default Page;
