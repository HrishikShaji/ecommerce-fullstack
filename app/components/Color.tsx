"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { Color as ColorType } from "@prisma/client";
import { useDeleteColor } from "../lib/queries/color";

interface ColorProps {
  color: ColorType;
}

export const Color: React.FC<ColorProps> = ({ color }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { deleteColor, isDeleting } = useDeleteColor();
  return (
    <tbody>
      <tr key={color.id} className="border-neutral-700 border-b-2">
        <td className="py-1">{color.name}</td>
        <td>{color.id}</td>
        <td className="flex items-center w-full justify-end pt-2 gap-2">
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
    </tbody>
  );
};
