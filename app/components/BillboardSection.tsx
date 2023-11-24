"use client";
import { useGetQuery } from "../lib/queries/customQuery";
import BillboardForm from "./BillboardForm";
import Table from "./ui/Table";

const BillBoardSection = () => {
  const { data, isError } = useGetQuery({
    endpoint: "billboard",
    page: 1,
    sort: "LATEST",
    queryKey: "billboards",
  });

  if (isError) return null;
  console.log(data);
  return (
    <div className="flex flex-col gap-10 w-full">
      <BillboardForm />
      <div>
        <Table data={data} headings={["Billboard", "Date"]} />
      </div>
    </div>
  );
};

export default BillBoardSection;
