"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { useAddSize, useGetSizes } from "../lib/queries/size";
import { SectionContainer } from "./SectionContainer";

export const SizeSection = () => {
  const [size, setSize] = useState("");
  const { sizes, isLoading, isError } = useGetSizes();
  const { addSize, isPending } = useAddSize();

  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Sizes</h1>
        <form
          className="flex gap-2 items-end"
          onSubmit={(e) => {
            e.preventDefault();
            addSize({
              name: size,
            });
            setSize("");
          }}
        >
          <div className="flex flex-col gap-2">
            <label>Size Name</label>
            <input
              value={size}
              className="p-1 rounded-md text-black focus:outline-none placeholder-gray-600"
              placeholder="eg : onam"
              onChange={(e) => setSize(e.target.value)}
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
            title="Sizes"
            headings={["Size", "Category", "Date"]}
            data={sizes}
          />
        )}
      </div>
    </div>
  );
};
