import { Dispatch, SetStateAction } from "react";
import { ImSearch } from "react-icons/im";

interface SearchProps {
  onChange: Dispatch<SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = (props) => {
  return (
    <div className="relative z-[-1] isolate flex items-center">
      <input
        className="p-1 text-black rounded-md"
        onChange={(e) => props.onChange(e.target.value)}
        placeholder="Search..."
      />
      <button className="absolute z-20 right-2">
        <ImSearch color="black" />
      </button>
    </div>
  );
};

export default Search;
