"use client";
import { BillBoard, Category, Color, Product, Size } from "@prisma/client";
import { RowActions } from "./RowActions";
import { format } from "date-fns";
import { useDeleteQuery } from "../lib/queries/customQuery";
import { EndpointType, QueryKey } from "@/types/types";

interface RowProps {
  data: BillBoard | Category | Product | Size | Color;
  queryKey: QueryKey;
  endpoint: EndpointType;
  keys: string[];
}

export const Row: React.FC<RowProps> = ({ data, queryKey, endpoint, keys }) => {
  const { remove, isDeleting } = useDeleteQuery({
    queryKey: queryKey,
    endpoint: endpoint,
  });

  return (
    <div
      key={data.id}
      className="border-b-2 w-full grid grid-cols-3 justify-between border-neutral-700"
    >
      {Object.keys(data).map((key, i) => {
        const value =
          key === "createdAt"
            ? format(new Date(data[key]), "yyyy-MM-dd")
            : (data as any)[key];
        return keys.includes(key) ? <div key={i}>{value}</div> : null;
      })}
      <RowActions
        mode="billboard"
        data={data}
        deleteAction={remove}
        isDeleting={isDeleting}
      />
    </div>
  );
};
