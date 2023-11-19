import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import { SectionContainer } from "./SectionContainer";
import {
  AddQueryProps,
  GetQueryProps,
  QueryKey,
  SortType,
  Validator,
} from "@/types/types";
import { UseMutateFunction } from "@tanstack/react-query";
import { CustomForm } from "./CustomForm";
import { FinalInputType, InputValuesDataType } from "../lib/data";

interface SectionProps<T> {
  endpoint: string;
  heading: string;
  label: string;
  placeholder: string;
  name: string;
  queryKey: QueryKey;
  validator: Validator<T>;
  customGetHook: (values: GetQueryProps) => {
    count: number;
    data: any[];
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
  };
  customAddHook: (values: AddQueryProps<T>) => {
    add: UseMutateFunction<Response, Error, T, unknown>;
    isPending: boolean;
    isError: boolean;
    error: Error;
  };
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings: string[];
  inputInitialObj: Record<string, any>;
  inputValues: InputValuesDataType[];
}

export const Section = <T,>({
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
  inputValues,
  inputInitialObj,
}: SectionProps<T>) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortType>("LATEST");
  const [formData, setFormData] =
    useState<Record<string, any>>(inputInitialObj);

  const { refetch, data, count, isLoading, isError } = customGetHook({
    page: page,
    sort: sort,
    endpoint: endpoint,
    queryKey: queryKey,
  });
  const {
    add,
    isPending,
    isError: errorAdd,
    error,
  } = customAddHook({
    endpoint: endpoint,
    validator: validator,
    queryKey: queryKey,
  });
  console.log(error?.message);

  const newData = inputValues.map((input) => {
    if (input.type === "Input") {
      const newObj = { ...input, value: formData[input.name] };
      return newObj;
    }
    if (input.type === "DropDown") {
      const newObj = { ...input, value: input.name };
      return newObj;
    }

    return input;
  });
  useEffect(() => {
    refetch();
  }, [page, sort]);
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-semibold">{heading}</h1>
        <CustomForm
          isError={errorAdd}
          error={error}
          isPending={isPending}
          formData={formData}
          setFormData={setFormData}
          inputValues={newData as FinalInputType[]}
          refetch={refetch}
          apiFunction={add}
        />
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
