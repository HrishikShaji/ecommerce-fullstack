import { ChangeEvent } from "react";

interface CheckBoxProps {
  selected: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  selected = false,
  label,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    onChange(checked);
  };
  return (
    <div className="flex gap-2">
      <label>
        <input type="checkbox" checked={selected} onChange={handleChange} />
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
