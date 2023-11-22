import { ChangeEvent, useState } from "react";

interface InputFieldProps {
  value: string;
  label?: string;
  type: "text" | "textarea";
  placeholder: string;
  onChange: (value: string) => void;
  validator: any;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const [error, setError] = useState(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    props.onChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      {props.label && <label>{props.label}</label>}
      <input
        value={props.value}
        type={props.type}
        className="p-2 rounded-md "
        placeholder={props.placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputField;
