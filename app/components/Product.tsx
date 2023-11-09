"use client";
import { MdDelete, MdEdit } from "react-icons/md";
import { ProductChild } from "@/types/types";
import { Spinner } from "./Spinner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { onOpen } from "@/redux/slices/modalSlice";
import { useDeleteProduct } from "../lib/queries/product";

interface ProductProps {
  product: ProductChild;
}

export const Product: React.FC<ProductProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { deleteProduct, isDeleting } = useDeleteProduct();

  return (
    <>
      <tr key={product.id} className="">
        <td>{product.name}</td>
        <td>{product.category.name}</td>
        <td>{product.billboard.name}</td>
        <td>{product.size.name}</td>
        <td>{product.color.name}</td>
        <td>{product.user.name}</td>
        <td className="flex items-center w-full justify-center  gap-2">
          <button
            onClick={() => dispatch(onOpen({ mode: "product", data: product }))}
            className="cursor-pointer"
          >
            <MdEdit />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => deleteProduct(product.id)}
          >
            {isDeleting ? <Spinner /> : <MdDelete />}
          </button>
        </td>
      </tr>
    </>
  );
};
