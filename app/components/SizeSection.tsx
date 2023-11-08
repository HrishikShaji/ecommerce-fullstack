"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";
import { FormEvent, useState } from "react";
import {
  ProductPayload,
  validateProductPayload,
} from "../lib/validators/Product";
import { BillBoard as BillBoardType, Size as SizeType } from "@prisma/client";
import { Billboard } from "./Billboard";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../lib/validators/Billboard";
import { SizePayload, validateSizePayload } from "../lib/validators/size";
import { Size } from "./Size";

export const SizeSection = () => {
  const [size, setSize] = useState("");

  const { mutate: addSize, isPending } = useMutation({
    mutationFn: async (payload: SizePayload) => {
      const response = await fetch("/api/size", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return response;
    },
    onError: () => {
      return <div>Error addind category</div>;
    },
    onSuccess: () => {
      setSize("");
      refetch();
    },
  });
  const handleAddSize = async (e: FormEvent, payload: SizePayload) => {
    e.preventDefault();
    const isValidPayload = validateSizePayload(payload);
    addSize(isValidPayload);
  };
  const {
    data: sizes,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sizes"],
    queryFn: async () => {
      const response = await fetch(`/api/size`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Add Sizes</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) =>
            handleAddSize(e, {
              name: size,
            })
          }
        >
          <input
            value={size}
            className="p-2 text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : onam"
            onChange={(e) => setSize(e.target.value)}
          />
          <button type="submit" className="px-3 py-2 border-white border-2">
            {isPending ? <Spinner /> : "Add"}
          </button>
        </form>
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          <table className="w-full">
            <tr className="text-left">
              <th>Size</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
            {sizes.map((size: SizeType) => {
              return <Size size={size} key={size.id} />;
            })}
          </table>
        )}
      </div>
    </div>
  );
};
