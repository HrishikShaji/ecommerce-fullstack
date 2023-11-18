"use client";

import { BillBoard, Category, Color, Product, Size } from "@prisma/client";
import { useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateQuery } from "../lib/queries/customQuery";
import { EndpointType, QueryKey } from "@/types/types";

interface ModalFormProps {
  data: BillBoard | Product | Category | Size | Color;
  action: "Add" | "Update";
  endpoint: EndpointType;
  queryKey: QueryKey;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  data,
  action,
  endpoint,
  queryKey,
}) => {
  const [name, setName] = useState(data.name || "");

  const { update, isPending } = useUpdateQuery({
    endpoint: endpoint,
    queryKey: queryKey,
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        update({ name: name, id: data.id });
      }}
    >
      <input
        value={name}
        className="p-2 rounded-md text-black"
        onChange={(e) => setName(e.target.value)}
      />
      <button>{isPending ? <Spinner /> : "Update"}</button>
    </form>
  );
};
