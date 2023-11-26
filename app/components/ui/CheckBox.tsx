import { ChangeEvent } from "react";

interface CheckBoxProps {
  selected: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  console.log(props.selected);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    props.onChange(checked);
  };
  return (
    <div className="flex gap-2">
      <label>
        <input
          type="checkbox"
          checked={props.selected}
          onChange={handleChange}
        />
        {props.label}
      </label>
    </div>
  );
};

export default CheckBox;