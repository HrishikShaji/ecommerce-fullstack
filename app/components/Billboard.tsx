"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import { CategoryPayload } from "../lib/validators/category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { BillBoard } from "@prisma/client";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../lib/validators/Billboard";

interface BillboardProps {
  billboard: BillBoard;
}

export const Billboard: React.FC<BillboardProps> = ({ billboard }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: deleteBillboard, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/billboard?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["billboards"] }),
  });

  const handleBillboard = async (e: FormEvent, payload: BillboardPayload) => {
    e.preventDefault();
    const isValidPayload = validateBillboardPayload(payload);
  };

  return (
    <>
      <tr key={billboard.id} className="">
        <td>{billboard.name}</td>
        <td>{billboard.id}</td>
        <td className="flex items-center w-full justify-center  gap-2">
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
