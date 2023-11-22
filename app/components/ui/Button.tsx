import { FormEvent } from "react";

interface ButtonProps {
  onClick: (e: FormEvent) => void;
  value: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="rounded-md p-2 bg-white text-black"
      onClick={(e) => props.onClick(e)}
    >
      {props.value}
    </button>
  );
};

export default Button;
