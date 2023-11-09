"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { Size as SizeType } from "@prisma/client";
import { useDeleteSize } from "../lib/queries/size";

interface SizeProps {
  size: SizeType;
}

export const Size: React.FC<SizeProps> = ({ size }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { deleteSize, isDeleting } = useDeleteSize();
  return (
    <>
      <tr key={size.id} className="">
        <td>{size.name}</td>
        <td>{size.id}</td>
        <td className="flex items-center w-full justify-center  gap-2">
          <button
            onClick={() => dispatch(onOpen({ mode: "size", data: size }))}
            className="cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteSize(size.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </>
  );
};
