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

  const min = values?.price?.min ? values.price.min : 0;
  const max = values?.price?.max ? values.price.max : 10000;

  return (
    <div className="flex flex-col gap-4 text-white">
      <h1>{props.label}</h1>
      <div className="w-full flex justify-between">
        <h1>{min}$</h1>
        <h1>{max}$</h1>
      </div>
      <div>
        <InputRange
          minValues={min}
          maxValues={max}
          onChange={setFilterRangeValues}
        />
      </div>
    </div>
  );
};
