"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { Color as ColorType } from "@prisma/client";
import { ColorPayload, validateColorPayload } from "../lib/validators/color";

interface ColorProps {
  color: ColorType;
}

export const Color: React.FC<ColorProps> = ({ color }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const { mutate: deleteColor, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/color?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["colors"] }),
  });

  const handleColor = async (e: FormEvent, payload: ColorPayload) => {
    e.preventDefault();
    const isValidPayload = validateColorPayload(payload);
  };

  return (
    <>
      <tr key={color.id} className="">
        <td>{color.name}</td>
        <td>{color.id}</td>
        <td className="flex items-center w-full justify-center  gap-2">
          <button
            onClick={() => dispatch(onOpen({ mode: "color", data: color }))}
            className="cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteColor(color.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </>
  );
};
