"use client";

import { Size } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateSize } from "../lib/queries/size";

interface SizeUpdateFormProps {
  size: Size;
}

export const SizeUpdateForm: React.FC<SizeUpdateFormProps> = ({ size }) => {
  const [name, setName] = useState(size.name || "");

  const { updateSize, isPending } = useUpdateSize();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        updateSize({ name: name, id: size.id });
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
