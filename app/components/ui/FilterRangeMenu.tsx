import { useState } from "react";

interface FilterRangeMenuProps {
  label: string;
  start: number;
  end: number;
}

export const FilterRangeMenu: React.FC<FilterRangeMenuProps> = (props) => {
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(10000);
  console.log(startValue, endValue);
  return (
    <div className="flex flex-col gap-4">
      <h1>{props.label}</h1>
      <div className="w-full flex justify-between">
        <h1>{props.start}$</h1>
        <h1>{props.end}$</h1>
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
