"use client";

import { BillBoard, Color, Product, Size } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateBillboard } from "../lib/queries/billboard";

interface BillBoardUpdateFormProps {
  billboard: BillBoard;
}

export const BillBoardUpdateForm: React.FC<BillBoardUpdateFormProps> = ({
  billboard,
}) => {
  const [name, setName] = useState(billboard.name || "");

  const { updateBillboard, isPending } = useUpdateBillboard();
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        updateBillboard({ name: name, id: billboard.id });
      }}
    >
      <input
        value={name || ""}
        className="p-2 rounded-md text-black"
        onChange={(e) => setName(e.target.value)}
      />
      <button>{isPending ? <Spinner /> : "Update"}</button>
    </form>
  );
};
