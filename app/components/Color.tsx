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
    <tbody>
      <tr key={data.id} className="border-neutral-700 border-b-2">
        <td className="py-1">{data.name}</td>
        <td>{data.id}</td>
        <RowActions
          data={data}
          mode="color"
          deleteAction={deleteColor}
          isDeleting={isDeleting}
        />
      </tr>
    </tbody>
  );
};
