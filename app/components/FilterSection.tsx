import { Dispatch, SetStateAction, useState } from "react";
import Dropdown from "./ui/Dropdown";

interface FilterSectionProps {
  setValues: Dispatch<SetStateAction<Record<string, any>>>;
  values: Record<string, any>;
  refetch: () => {};
  isLoading: boolean;
}

export const FilterSection: React.FC<FilterSectionProps> = (
  props: FilterSectionProps,
) => {
  console.log(props.values);
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
        value={props.values.colorId}
        label="Color"
      />
      <Dropdown
        endpoint="size"
        queryKey="sizes"
        onChange={(value) => handleDropdown("sizeId", value)}
        placeholder="Filter by size"
        value={props.values.sizeId}
        label="Size"
      />
      <Dropdown
        endpoint="billboard"
        queryKey="billboards"
        onChange={(value) => handleDropdown("billboardId", value)}
        placeholder="Filter by billboard"
        value={props.values.billboardId}
        label="Billboard"
      />
      <Dropdown
        endpoint="category"
        queryKey="categories"
        onChange={(value) => handleDropdown("categoryId", value)}
        placeholder="Filter by category"
        value={props.values.categoryId}
        label="Category"
      />
      <button onClick={handleFilterClick}>
        {props.isLoading ? "Loading" : "Submit"}
      </button>
    </div>
  );
};
