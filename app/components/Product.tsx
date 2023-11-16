"use client";
import { ProductChild } from "@/types/types";
import { RowActions } from "./RowActions";
import { useDeleteQuery } from "../lib/queries/customQuery";

interface ProductProps {
  data: ProductChild;
}

export const Product: React.FC<ProductProps> = ({ data }) => {
  const { remove, isDeleting } = useDeleteQuery({
    endpoint: "product",
    queryKey: "products",
  });
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
        deleteAction={remove}
        isDeleting={isDeleting}
        mode="product"
      />
    </div>
  );
};
