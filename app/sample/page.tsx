"use client";

import { MdDelete } from "react-icons/md";
import Form from "../components/ui/Form";
import { useGetQuery } from "../lib/queries/customQuery";
import { format } from "date-fns";
import Table from "../components/ui/Table";

const Page = () => {
  const { data, isError } = useGetQuery({
    endpoint: "product",
    queryKey: "products",
    page: 1,
    sort: "LATEST",
  });
  if (isError) return null;
  console.log(data);
  const headings = ["Name", "Date"];
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center bg-neutral-600 justify-center">
      <Table headings={headings} data={data} />
    </div>
  );
};

export default Page;
