"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { Color as ColorType } from "@prisma/client";
import { Color } from "./Color";
import { useAddColors, useGetColors } from "../lib/queries/color";
import { SectionContainer } from "./SectionContainer";

export const ColorSection = () => {
  const [color, setColor] = useState("");

  const { colors, isError, isLoading } = useGetColors();
  const { addColor, isPending } = useAddColors();

  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Colors</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addColor({
              name: color,
            });
            setColor("");
          }}
        >
          <input
            value={color}
            className="p-2 text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : Black"
            onChange={(e) => setColor(e.target.value)}
          />
          <button type="submit" className="px-3 py-2 border-white border-2">
            {isPending ? <Spinner /> : "Add"}
          </button>
        </form>
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
