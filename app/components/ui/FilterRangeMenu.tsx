import { useFilterQuery } from "@/app/hooks/useFilterQuery";
import { useEffect, useState } from "react";

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
  const [startValue, setStartValue] = useState(
    values?.price?.min ? values.price.min : 0,
  );
  const [endValue, setEndValue] = useState(
    values?.price?.max ? values.price.max : 10000,
  );
  useEffect(() => {
    setFilterRangeValues({ startValue: startValue, endValue: endValue });
  }, [startValue, endValue]);
  return (
    <div className="flex flex-col gap-4">
      <h1>{props.label}</h1>
      <div className="w-full flex justify-between">
        <h1>{startValue}$</h1>
        <h1>{endValue}$</h1>
      </div>
      <div className="flex ">
        <input
          id="startRange"
          type="range"
          min={0}
          max={5000}
          value={startValue}
          step={100}
          onChange={(e) => {
            setStartValue(Number(e.target.value));
          }}
        />
        <input
          id="endRange"
          type="range"
          min={5000}
          max={10000}
          value={endValue}
          step={100}
          onChange={(e) => {
            setEndValue(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};
