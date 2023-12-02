import { Dispatch, SetStateAction, useState } from "react";
import Dropdown from "./ui/Dropdown";
import Button from "./ui/Button";

interface FilterSectionProps {
  setValues: Dispatch<SetStateAction<Record<string, any>>>;
  value: string;
  refetch: () => {};
  isLoading: boolean;
}

export const FilterSection: React.FC<FilterSectionProps> = (
  props: FilterSectionProps,
) => {
  const handleDropdown = (key: string, value: string) => {
    props.setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFilterClick = () => {
    props.refetch();
  };
  return (
    <div className="p-5 grid grid-cols-3 text-white">
      <Dropdown
        endpoint="color"
        queryKey="colors"
        onChange={(value) => handleDropdown("colorId", value)}
        placeholder="Filter by color"
        value={props.value}
        label="Color"
      />
      <button onClick={handleFilterClick}>
        {props.isLoading ? "Loading" : "Submit"}
      </button>
    </div>
  );
};
