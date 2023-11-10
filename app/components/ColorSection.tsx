"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { useAddColors, useGetColors } from "../lib/queries/color";
import { SectionContainer } from "./SectionContainer";

export const ColorSection = () => {
  const [color, setColor] = useState("");

  const { colors, isError, isLoading } = useGetColors();
  const { addColor, isPending } = useAddColors();

  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Colors</h1>
        <form
          className="flex gap-2 items-end"
          onSubmit={(e) => {
            e.preventDefault();
            addColor({
              name: color,
            });
            setColor("");
          }}
        >
          <div className="flex flex-col gap-2">
            <label>Color Name</label>
            <input
              value={color}
              className="p-1 text-black focus:outline-none rounded-md placeholder-gray-600"
              placeholder="eg : Black"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1 bg-white text-black font-semibold rounded-md"
          >
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
