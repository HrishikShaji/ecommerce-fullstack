"use client";
import { Size as SizeType } from "@prisma/client";
import { useDeleteSize } from "../lib/queries/size";
import { RowActions } from "./RowActions";

interface SizeProps {
  data: SizeType;
}

export const Size: React.FC<SizeProps> = ({ data }) => {
  const { deleteSize, isDeleting } = useDeleteSize();
  return (
    <div
      key={data.id}
      className="border-neutral-700 grid grid-cols-3 border-b-2"
    >
      <div className="py-1">{data.name}</div>
      <div>{data.id}</div>
      <RowActions
        deleteAction={deleteSize}
        isDeleting={isDeleting}
        data={data}
        mode="size"
      />
    </div>
  );
};
