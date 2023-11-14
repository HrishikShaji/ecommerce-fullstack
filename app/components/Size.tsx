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
    <tbody>
      <tr key={data.id} className="border-neutral-700 border-b-2">
        <td className="py-1">{data.name}</td>
        <td>{data.id}</td>
        <RowActions
          deleteAction={deleteSize}
          isDeleting={isDeleting}
          data={data}
          mode="size"
        />
      </tr>
    </tbody>
  );
};
