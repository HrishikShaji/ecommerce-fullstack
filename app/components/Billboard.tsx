"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { BillBoard } from "@prisma/client";
import { useDeleteBillboard } from "../lib/queries/billboard";

interface BillboardProps {
  billboard: BillBoard;
}

export const Billboard: React.FC<BillboardProps> = ({ billboard }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { deleteBillboard, isDeleting } = useDeleteBillboard();

  return (
    <>
      <tr key={billboard.id} className="border-b-2 border-neutral-700">
        <td className="py-1">{billboard.name}</td>
        <td>{billboard.id}</td>
        <td className="flex items-center w-full justify-end pt-2 gap-2">
          <button
            onClick={() =>
              dispatch(onOpen({ mode: "billboard", data: billboard }))
            }
            className="cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteBillboard(billboard.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </>
  );
};
