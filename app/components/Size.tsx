"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { Size as SizeType } from "@prisma/client";
import { useDeleteSize } from "../lib/queries/size";

interface SizeProps {
  data: SizeType;
}

export const Size: React.FC<SizeProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { deleteSize, isDeleting } = useDeleteSize();
  return (
    <tbody>
      <tr key={data.id} className="border-neutral-700 border-b-2">
        <td className="py-1">{data.name}</td>
        <td>{data.id}</td>
        <td className="flex items-center w-full justify-end pt-2 gap-2">
          <button
            onClick={() => dispatch(onOpen({ mode: "size", data: data }))}
            className="cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteSize(data.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </tbody>
  );
};
