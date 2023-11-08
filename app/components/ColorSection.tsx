"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";
import { FormEvent, useState } from "react";
import { Color as ColorType } from "@prisma/client";
import { ColorPayload, validateColorPayload } from "../lib/validators/color";
import { Color } from "./Color";

export const ColorSection = () => {
  const [color, setColor] = useState("");

  const { mutate: addColor, isPending } = useMutation({
    mutationFn: async (payload: ColorPayload) => {
      const response = await fetch("/api/color", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onError: () => {
      return <div>Error addind category</div>;
    },
    onSuccess: () => {
      setColor("");
      refetch();
    },
  });
  const handleAddColor = async (e: FormEvent, payload: ColorPayload) => {
    e.preventDefault();
    const isValidPayload = validateColorPayload(payload);
    addColor(isValidPayload);
  };
  const {
    data: colors,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const response = await fetch(`/api/color`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Colors</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) =>
            handleAddColor(e, {
              name: color,
            })
          }
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
          <table className="w-full">
            <tr className="text-left">
              <th>Color</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
            {colors.map((color: ColorType) => {
              return <Color color={color} key={color.id} />;
            })}
          </table>
        )}
      </div>
    </div>
  );
};
