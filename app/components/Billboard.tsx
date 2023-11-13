"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { BillBoard } from "@prisma/client";
import { useDeleteBillboard } from "../lib/queries/billboard";

interface BillboardProps {
  data: BillBoard;
}

export const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { deleteBillboard, isDeleting } = useDeleteBillboard();

  return (
    <tbody>
      <tr key={data.id} className="border-b-2 border-neutral-700">
        <td className="py-1">{data.name}</td>
        <td>{data.id}</td>
        <td className="flex items-center w-full justify-end pt-2 gap-2">
          <button
            onClick={() => dispatch(onOpen({ mode: "billboard", data: data }))}
            className="cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteBillboard(data.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </tbody>
  );
};
