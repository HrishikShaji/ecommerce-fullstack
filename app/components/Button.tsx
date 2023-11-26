import { Spinner } from "./Spinner";

interface ButtonProps {
  isPending: boolean;
  label: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      type="submit"
      className="px-3 py-1 bg-neutral-600 text-white font-semibold rounded-md"
    >
      {props.isPending ? <Spinner /> : props.label}
    </button>
  );
};
