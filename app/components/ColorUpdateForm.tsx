"use client";

import { Color } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateColor } from "../lib/queries/color";

interface ColorUpdateFormProps {
  color: Color;
}

export const ColorUpdateForm: React.FC<ColorUpdateFormProps> = ({ color }) => {
  const [name, setName] = useState(color.name || "");

  const { updateColor, isPending } = useUpdateColor();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        updateColor({ name: name, id: color.id });
      }}
    >
      <input
        value={name}
        className="p-2 rounded-md text-black"
        onChange={(e) => setName(e.target.value)}
      />
      <button>{isPending ? <Spinner /> : "Update"}</button>
    </form>
  );
};
