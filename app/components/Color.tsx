"use client";
import { Color as ColorType } from "@prisma/client";
import { useDeleteColor } from "../lib/queries/color";
import { RowActions } from "./RowActions";

interface ColorProps {
  data: ColorType;
}

export const Color: React.FC<ColorProps> = ({ data }) => {
  const { deleteColor, isDeleting } = useDeleteColor();
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
        deleteAction={deleteColor}
        isDeleting={isDeleting}
      />
    </div>
  );
};
