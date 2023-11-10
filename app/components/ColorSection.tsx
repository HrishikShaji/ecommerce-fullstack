"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { useAddColors, useGetColors } from "../lib/queries/color";
import { SectionContainer } from "./SectionContainer";
import { Form, InputItem } from "./Form";

export const ColorSection = () => {
  const [color, setColor] = useState("");

  const { colors, isError, isLoading } = useGetColors();
  const { addColor, isPending } = useAddColors();

  const values: InputItem[] = [
    {
      label: "Color",
      name: "name",
      value: color,
      placeholder: "eg: black",
      onChange: setColor,
    },
  ];
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Colors</h1>
        <Form values={values} isPending={isPending} apiFunction={addColor} />
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <SectionContainer
            title="Colors"
            headings={["Color", "Category", "Date"]}
            data={colors}
          />
        )}
      </div>
    </div>
  );
};
