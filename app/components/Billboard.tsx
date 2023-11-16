"use client";
import { BillBoard } from "@prisma/client";
import { RowActions } from "./RowActions";
import { format } from "date-fns";
import { useDeleteQuery } from "../lib/queries/customQuery";

interface BillboardProps {
  data: BillBoard;
}

export const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const { remove, isDeleting } = useDeleteQuery({
    queryKey: "billboards",
    endpoint: "billboard",
  });

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
        deleteAction={remove}
        isDeleting={isDeleting}
      />
    </div>
  );
};
