"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { ProductChild } from "@/types/types";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { useDeleteProduct } from "../lib/queries/product";

interface ProductProps {
  data: ProductChild;
}

export const Product: React.FC<ProductProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { deleteProduct, isDeleting } = useDeleteProduct();
  console.log(data);
  return (
    <tbody>
      <tr key={data.id} className="border-b-2 border-neutral-700 ">
        <td className="py-1">{data.name}</td>
        <td>{data.category.name}</td>
        <td>{data.billboard.name}</td>
        <td>{data.size.name}</td>
        <td>{data.color.name}</td>
        <td>{data.user.name}</td>
        <td className="flex items-center w-full justify-end  pt-2  gap-2">
          <button
            onClick={() => dispatch(onOpen({ mode: "product", data: data }))}
            className="cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteProduct(data.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </tbody>
  );
};
