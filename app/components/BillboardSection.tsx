"use client";
import { Spinner } from "../components/Spinner";
import { useState } from "react";
import { BillBoard as BillBoardType } from "@prisma/client";
import { Billboard } from "./Billboard";
import { useAddBillboard, useGetBillboards } from "../lib/queries/billboard";
import { ImSearch } from "react-icons/im";
import { SectionContainer } from "./SectionContainer";

export const BillboardSection = () => {
  const [billboard, setBillboard] = useState("");
  const { billboards, isLoading, isError } = useGetBillboards();
  const { addBillboard, isPending } = useAddBillboard();
  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-semibold">Add Billboards</h1>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            addBillboard({
              name: billboard,
            });
            setBillboard("");
          }}
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
      {isLoading ? (
        <Spinner />
      ) : (
        <SectionContainer
          title="Billboards"
          headings={["Bill", "Cat"]}
          data={billboards}
        />
      )}
    </div>
  );
};
