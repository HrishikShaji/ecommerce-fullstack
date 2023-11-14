"use client";
import { BillBoard } from "@prisma/client";
import { useDeleteBillboard } from "../lib/queries/billboard";
import { RowActions } from "./RowActions";

interface BillboardProps {
  data: BillBoard;
}

export const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const { deleteBillboard, isDeleting } = useDeleteBillboard();

  return (
    <tbody>
      <tr key={data.id} className="border-b-2 border-neutral-700">
        <td className="py-1">{data.name}</td>
        <td>{data.id}</td>
        <RowActions
          mode="billboard"
          data={data}
          deleteAction={deleteBillboard}
          isDeleting={isDeleting}
        />
      </tr>
    </tbody>
  );
};
