import { ChangeEvent } from "react";

interface InputFieldProps {
  value: string;
  label?: string;
  type: "text" | "textarea" | "number" | "email";
  placeholder: string;
  onChange: (value: string) => void;
  validator: any;
}

const InputField: React.FC<InputFieldProps> = (props) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    props.onChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      {props.label && <label>{props.label}</label>}
      {props.type === "textarea" ? (
        <textarea
          className="p-2 rounded-md"
          value={props.value}
          onChange={handleChange}
          placeholder={props.placeholder}
        />
      ) : (
        <input
          value={props.value}
          type={props.type}
          className="p-2 rounded-md text-black"
          placeholder={props.placeholder}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default InputField;
