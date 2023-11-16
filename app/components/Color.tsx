"use client";
import { Color as ColorType } from "@prisma/client";
import { RowActions } from "./RowActions";
import { useDeleteQuery } from "../lib/queries/customQuery";

interface ColorProps {
  data: ColorType;
}

export const Color: React.FC<ColorProps> = ({ data }) => {
  const { remove, isDeleting } = useDeleteQuery({
    endpoint: "color",
    queryKey: "colors",
  });
  return (
    <div
      key={data.id}
      className="border-neutral-700 grid grid-cols-3 border-b-2"
    >
      <div className="py-1">{data.name}</div>
      <div>{data.id}</div>
      <RowActions
        data={data}
        mode="color"
        deleteAction={remove}
        isDeleting={isDeleting}
      />
    </div>
  );
};
