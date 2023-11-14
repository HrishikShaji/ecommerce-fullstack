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
    <tbody>
      <tr key={data.id} className="border-b-2 border-neutral-700 ">
        <td className="py-1">{data.name}</td>
        <td>{data.category.name}</td>
        <td>{data.billboard.name}</td>
        <td>{data.size.name}</td>
        <td>{data.color.name}</td>
        <td>{data.user.name}</td>
        <RowActions
          data={data}
          deleteAction={deleteProduct}
          isDeleting={isDeleting}
          mode="product"
        />
      </tr>
    </tbody>
  );
};
