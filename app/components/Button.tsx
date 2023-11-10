import { Spinner } from "./Spinner";

interface ButtonProps {
  isPending: boolean;
}

export const Button: React.FC<ButtonProps> = ({ isPending }) => {
  return (
    <button
      type="submit"
      className="px-3 py-1 bg-neutral-600 text-white font-semibold rounded-md"
    >
      {isPending ? <Spinner /> : "Add"}
    </button>
  );
};
