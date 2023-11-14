import { MdDelete, MdEdit } from "react-icons/md";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { BillBoard, Color, Product, Size } from "@prisma/client";
import { IoAddCircle } from "react-icons/io5";

interface RowActionProps {
  isDeleting: boolean;
  deleteAction: (id: string) => void;
  data: Product | BillBoard | Size | Color;
  mode: "product" | "category" | "size" | "color" | "billboard" | "subCategory";
}

export const RowActions: React.FC<RowActionProps> = ({
  isDeleting,
  deleteAction,
  data,
  mode,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <tr className="flex items-center w-full justify-end pt-2 gap-2">
      {mode === "category" && (
        <button
          onClick={() => dispatch(onOpen({ mode: "subCategory", data: data }))}
        >
          <IoAddCircle />
        </button>
      )}
      <button
        onClick={() => dispatch(onOpen({ mode: mode, data: data }))}
        className="cursor-pointer"
      >
        <MdEdit />
      </button>
      <button className="cursor-pointer" onClick={() => deleteAction(data.id)}>
        {isDeleting ? <Spinner /> : <MdDelete />}
      </button>
    </tr>
  );
};
