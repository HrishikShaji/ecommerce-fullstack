"use client";
import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import { useAddBillboard, useGetBillboards } from "../lib/queries/billboard";
import { SectionContainer } from "./SectionContainer";
import { Form, InputItem } from "./Form";

export const BillboardSection = () => {
  const [billboard, setBillboard] = useState("");
  const [page, setPage] = useState(1);
  const { refetch, billboards, count, isLoading, isError } =
    useGetBillboards(page);
  const { addBillboard, isPending } = useAddBillboard();

  useEffect(() => {
    refetch();
  }, [page]);
  const values: InputItem[] = [
    {
      label: "Billboard",
      name: "name",
      value: billboard,
      placeholder: "eg: easter",
      onChange: setBillboard,
    },
  ];
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-semibold">Add Billboards</h1>

        <Form
          values={values}
          apiFunction={addBillboard}
          isPending={isPending}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <SectionContainer
          title="Billboards"
          headings={["Bill", "Cat"]}
          data={billboards}
          setPage={setPage}
          page={page}
          count={count}
        />
      )}
    </div>
  );
};
