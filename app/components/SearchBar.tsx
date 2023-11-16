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
import { SearchType } from "./SectionContainer";
import { SortType } from "@/types/types";

interface SearchBarProps {
  isSearch: boolean;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  setIsSearching: Dispatch<SetStateAction<boolean>>;
  setSearchCount: Dispatch<SetStateAction<number>>;
  setSearchPage: Dispatch<SetStateAction<number>>;
  setSearchResults: Dispatch<SetStateAction<SearchType[] | []>>;
  searchPage: number;
  section: string;
  sort: SortType;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchPage,
  section,
  sort,
  isSearch,
  setSearchPage,
  setSearchResults,
  setIsSearch,
  setIsSearching,
  setSearchCount,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    results,
    refetch,
    count: searchCount,
    isLoading: isSearching,
  } = useSearch({
    page: searchPage,
    section: section,
    searchString: searchQuery,
    sort: sort,
  });
  useEffect(() => {
    if (isSearch) {
      refetch();
    }
  }, [searchPage, isSearch]);

  useEffect(() => {
    setSearchResults(results);
    setSearchCount(searchCount);
    setIsSearching(isSearching);
  }, [results, searchCount, isSearching]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setIsSearch(true);
    setSearchPage(1);
    refetch();
  };
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
