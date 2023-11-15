"use client";
import { ProductChild } from "@/types/types";
import { useDeleteProduct } from "../lib/queries/product";
import { RowActions } from "./RowActions";

interface ProductProps {
  data: ProductChild;
}

export const Product: React.FC<ProductProps> = ({ data }) => {
  const { deleteProduct, isDeleting } = useDeleteProduct();
  return (
    <div
      key={data.id}
      className="border-b-2 grid grid-cols-7 border-neutral-700 "
    >
      <div className="py-1">{data.name}</div>
      <div>{data.category.name}</div>
      <div>{data.billboard.name}</div>
      <div>{data.size.name}</div>
      <div>{data.color.name}</div>
      <div>{data.user.name}</div>
      <RowActions
        data={data}
        deleteAction={deleteProduct}
        isDeleting={isDeleting}
        mode="product"
      />
    </div>
  );
};
