"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";
import { FormEvent, useState } from "react";
import {
  ProductPayload,
  validateProductPayload,
} from "../lib/validators/Product";
import { BillBoard as BillBoardType } from "@prisma/client";
import { Billboard } from "./Billboard";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../lib/validators/Billboard";

export const BillboardSection = () => {
  const [billboard, setBillboard] = useState("");

  const { mutate: addBillboard, isPending } = useMutation({
    mutationFn: async (payload: BillboardPayload) => {
      const response = await fetch("/api/billboard", {
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
      setBillboard("");
      refetch();
    },
  });
  const handleAddBillboard = async (
    e: FormEvent,
    payload: BillboardPayload,
  ) => {
    e.preventDefault();
    const isValidPayload = validateBillboardPayload(payload);
    addBillboard(isValidPayload);
  };
  const {
    data: billboards,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["billboards"],
    queryFn: async () => {
      const response = await fetch(`/api/billboard`, {
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
        <h1 className="text-xl font-semibold">Add Billboards</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) =>
            handleAddBillboard(e, {
              name: billboard,
            })
          }
        >
          <input
            value={billboard}
            className="p-2 text-black focus:outline-none placeholder-gray-800"
            placeholder="eg : onam"
            onChange={(e) => setBillboard(e.target.value)}
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
              <th>Billboard</th>
              <th>Category</th>
              <th>Date</th>
              <th></th>
            </tr>
            {billboards.map((billboard: BillBoardType) => {
              return <Billboard billboard={billboard} key={billboard.id} />;
            })}
          </table>
        )}
      </div>
    </div>
  );
};
