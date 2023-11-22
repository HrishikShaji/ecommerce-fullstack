import { ChangeEvent } from "react";

interface DropdownProps {
  value: string;
  data: any[];
  placeholder: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    props.onChange(value);
  };
  return (
    <div>
      <select value={props.value} color="" onChange={handleChange}>
        <option value="">{props.placeholder}</option>
        {props.data.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
