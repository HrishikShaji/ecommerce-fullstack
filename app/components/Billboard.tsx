"use client";
import { BillBoard } from "@prisma/client";
import { useDeleteBillboard } from "../lib/queries/billboard";
import { RowActions } from "./RowActions";
import { format } from "date-fns";

interface BillboardProps {
  data: BillBoard;
}

export const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const { deleteBillboard, isDeleting } = useDeleteBillboard();

  return (
    <div
      key={data.id}
      className="border-b-2 w-full grid grid-cols-3 justify-between border-neutral-700"
    >
      <div className="py-1 ">{data.name}</div>
      <div className="">{format(new Date(data.createdAt), "yyyy-MM-dd")}</div>
      <RowActions
        mode="billboard"
        data={data}
        deleteAction={deleteBillboard}
        isDeleting={isDeleting}
      />
    </div>
  );
};
