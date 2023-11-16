import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import { SectionContainer } from "./SectionContainer";
import { Form, InputItem } from "./Form";
import { SortType } from "@/types/types";
import {
  AddPayload,
  AddQueryProps,
  GetQueryProps,
  QueryKey,
  Validator,
} from "../lib/queries/customQuery";
import { UseMutateFunction } from "@tanstack/react-query";

interface SectionProps {
  endpoint: string;
  heading: string;
  label: string;
  placeholder: string;
  name: string;
  queryKey: QueryKey;
  validator: Validator;
  customGetHook: (values: GetQueryProps) => {
    count: number;
    data: any[];
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
  };
  customAddHook: (values: AddQueryProps) => {
    add: UseMutateFunction<Response, Error, AddPayload, unknown>;
    isPending: boolean;
    isError: boolean;
  };
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings: string[];
}

export const Section: React.FC<SectionProps> = ({
  label,
  queryKey,
  placeholder,
  name,
  customGetHook,
  title,
  section,
  headings,
  validator,
  customAddHook,
  heading,
  endpoint,
}) => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortType>("LATEST");
  const { refetch, data, count, isLoading, isError } = customGetHook({
    page: page,
    sort: sort,
    endpoint: endpoint,
    queryKey: queryKey,
  });
  const { add, isPending } = customAddHook({
    endpoint: endpoint,
    validator: validator,
    queryKey: queryKey,
  });

  useEffect(() => {
    refetch();
  }, [page, sort]);
  const values: InputItem[] = [
    {
      label: label,
      name: name,
      value: value,
      placeholder: placeholder,
      onChange: setValue,
    },
  ];
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-semibold">{heading}</h1>

        <Form values={values} apiFunction={add} isPending={isPending} />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <SectionContainer
          title={title}
          headings={headings}
          data={data}
          setPage={setPage}
          page={page}
          count={count}
          section={section}
          setSort={setSort}
          sort={sort}
        />
      )}
    </div>
  );
};
