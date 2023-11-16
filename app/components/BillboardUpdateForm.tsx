"use client";

import { BillBoard } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateQuery } from "../lib/queries/customQuery";

interface BillBoardUpdateFormProps {
  billboard: BillBoard;
}

export const BillBoardUpdateForm: React.FC<BillBoardUpdateFormProps> = ({
  billboard,
}) => {
  const [name, setName] = useState(billboard.name || "");

  const { update, isPending } = useUpdateQuery({
    endpoint: "billboard",
    queryKey: "billboards",
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        update({ name: name, id: billboard.id });
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
