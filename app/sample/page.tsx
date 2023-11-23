"use client";

import { MdDelete } from "react-icons/md";
import Form from "../components/ui/Form";
import { useGetQuery } from "../lib/queries/customQuery";
import { format } from "date-fns";

const Page = () => {
  const { data, isError } = useGetQuery({
    endpoint: "product",
    queryKey: "products",
    page: 1,
    sort: "LATEST",
  });
  if (isError) return null;
  console.log(data);
  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center bg-neutral-600 justify-center">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone no</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Record<string, any>, key: number) => (
            <Row key={key} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;

const lookup = ["name", "createdAt"];

interface RowProps {
  item: Record<string, any>;
}

const Row: React.FC<RowProps> = (props) => {
  return (
    <tr>
      {Object.entries(props.item).map(([key, value]) => {
        const itemKey = lookup.includes(key);
        if (itemKey) {
          const itemValue =
            key === "createdAt" ? format(new Date(value), "yyyy-MM-dd") : value;
          return <td key={key}>{itemValue}</td>;
        }
      })}
    </tr>
  );
};
