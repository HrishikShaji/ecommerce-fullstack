"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { useAddSize, useGetSizes } from "../lib/queries/size";
import { SectionContainer } from "./SectionContainer";
import { Form, InputItem } from "./Form";

export const SizeSection = () => {
  const [size, setSize] = useState("");
  const { sizes, isLoading, isError } = useGetSizes();
  const { addSize, isPending } = useAddSize();

  const values: InputItem[] = [
    {
      label: "Size",
      name: "name",
      value: size,
      placeholder: "eg: medium",
      onChange: setSize,
    },
  ];
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Sizes</h1>
        <Form values={values} isPending={isPending} apiFunction={addSize} />
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <SectionContainer
            title="Sizes"
            headings={["Size", "Category", "Date"]}
            data={sizes}
          />
        )}
      </div>
    </div>
  );
};
