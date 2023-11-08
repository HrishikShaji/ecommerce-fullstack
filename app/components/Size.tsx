"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { FormEvent } from "react";
import { ProductChild } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import {
  CategoryPayload,
  validateCategoryPayload,
} from "../lib/validators/category";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { Modal } from "./Modal";
import { BillBoard, Size as SizeType } from "@prisma/client";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../lib/validators/Billboard";
import { SizePayload, validateSizePayload } from "../lib/validators/size";

interface SizeProps {
  size: SizeType;
}

export const Size: React.FC<SizeProps> = ({ size }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: updateSize, isPending: isAdding } = useMutation({
    mutationFn: async (payload: SizePayload) => {
      const response = await fetch("/api/size", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onError: () => {
      return <div>Error adding subCategory</div>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });
  const { mutate: deleteSize, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/size?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sizes"] }),
  });

  const handleSize = async (e: FormEvent, payload: SizePayload) => {
    e.preventDefault();
    const isValidPayload = validateSizePayload(payload);
  };

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
