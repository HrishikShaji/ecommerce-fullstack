"use client";

import { ProductChild } from "@/types/types";
import { Spinner } from "../components/ui/Spinner";
import { FilterSection } from "../components/FilterSection";
import { useState } from "react";
import { useFilterQuery } from "../hooks/useFilterQuery";

const Page = () => {
  const [values, setValues] = useState<Record<string, any>>({
    colorId: "",
    billboardId: "",
    sizeId: "",
    categoryId: "",
  });
  const { data, isError, isLoading, refetch } = useFilterQuery({
    endpoint: "filter",
    queryKey: "filters",
    page: 1,
    sort: "LATEST",
    colorId: values.colorId,
    sizeId: values.sizeId,
    billboardId: values.billboardId,
    categoryId: values.categoryId,
  });
  if (isError) return <div>Error</div>;
  if (isLoading) return <Spinner />;
  return (
    <div className="flex flex-col gap-5">
      <FilterSection
        refetch={refetch}
        setValues={setValues}
        values={values}
        isLoading={isLoading}
      />
      <div className="w-full min-h-screen p-10 grid grid-cols-3 gap-4">
        {data.map((item: ProductChild) => (
          <div key={item.id} className="p-2 bg-neutral-600 rounded-md">
            <h1>{item.name}</h1>
            <h1>{item.color.name}</h1>
            <h1>{item.size.name}</h1>
            <h1>{item.billboard.name}</h1>
            <h1>{item.category.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
