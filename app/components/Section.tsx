import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import { SectionContainer } from "./SectionContainer";
import { EndpointType, GetQueryProps, QueryKey, SortType } from "@/types/types";
import { NewForm } from "./NewForm";
import { InputValuesDataType } from "../lib/data";
import { PayloadType } from "../lib/utils";

interface SectionProps {
  endpoint: string;
  heading: string;
  queryKey: QueryKey;
  validator: (inputs: PayloadType) => typeof inputs;
  customGetHook: (values: GetQueryProps) => {
    count: number;
    data: any[];
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
  };
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings: string[];
  inputInitialObj: PayloadType;
  inputValues: InputValuesDataType[];
}

export const Section = ({
  queryKey,
  customGetHook,
  title,
  section,
  headings,
  validator,
  heading,
  endpoint,
  inputValues,
  inputInitialObj,
}: SectionProps) => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortType>("LATEST");

  const { refetch, data, count, isLoading, isError } = customGetHook({
    page: page,
    sort: sort,
    endpoint: endpoint,
    queryKey: queryKey,
  });

  useEffect(() => {
    refetch();
  }, [page, sort]);
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-semibold">{heading}</h1>
        <NewForm
          inputValues={inputValues}
          initialFormData={inputInitialObj}
          endpoint={endpoint as EndpointType}
          queryKey={queryKey}
          validator={validator}
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
