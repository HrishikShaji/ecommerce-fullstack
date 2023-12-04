interface FilterRangeMenuProps {
  label: string;
  start: number;
  end: number;
}

export const FilterRangeMenu: React.FC<FilterRangeMenuProps> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1>{props.label}</h1>
      <div className="w-full flex justify-between">
        <h1>{props.start}$</h1>
        <h1>{props.end}$</h1>
      </div>
    </div>
  );
};
