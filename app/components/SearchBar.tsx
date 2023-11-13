import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSearch } from "../lib/queries/search";
import { AiFillCloseCircle } from "react-icons/ai";
import { ImSearch } from "react-icons/im";

interface SearchBarProps {
  handleSearch: (e: FormEvent) => void;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  isSearch: boolean;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  handleSearch,
  setSearchQuery,
  searchQuery,
  isSearch,
  setIsSearch,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <form
        onSubmit={handleSearch}
        className="relative text-black flex items-center "
      >
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-md p-1"
          placeholder="Search..."
        />
        <button className="absolute right-2 ">
          <ImSearch color="black" />
        </button>
      </form>
      {isSearch && (
        <div
          className="p-2 cursor-pointer bg-neutral-700 rounded-md"
          onClick={() => {
            setIsSearch(false);
            setSearchQuery("");
          }}
        >
          <AiFillCloseCircle />
        </div>
      )}
    </div>
  );
};
