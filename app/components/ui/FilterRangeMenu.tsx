"use client";
import { useFilterQuery } from "@/app/hooks/useFilterQuery";
import { InputRange } from "./InputRange";

interface FilterRangeMenuProps {
  label: string;
}

export const FilterRangeMenu: React.FC<FilterRangeMenuProps> = (props) => {
  const { setFilterRangeValues, values } = useFilterQuery({
    endpoint: "filter",
    queryKey: "filters",
    page: 1,
    sort: "LATEST",
  });

  return (
    <div className="flex flex-col gap-4 text-white">
      <h1>{props.label}</h1>
      <div className="w-full flex justify-between">
        <h1>{values.price.min}$</h1>
        <h1>{values.price.max}$</h1>
      </div>
      <div>
        <InputRange
          minValues={values.price.min}
          maxValues={values.price.max}
          onChange={setFilterRangeValues}
        />
      </div>
    </div>
  );
};
