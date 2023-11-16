"use client";

import { Color } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateQuery } from "../lib/queries/customQuery";

interface ColorUpdateFormProps {
  color: Color;
}

export const ColorUpdateForm: React.FC<ColorUpdateFormProps> = ({ color }) => {
  const [name, setName] = useState(color.name || "");

  const { update, isPending } = useUpdateQuery({
    endpoint: "color",
    queryKey: "colors",
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        update({ name: name, id: color.id });
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
