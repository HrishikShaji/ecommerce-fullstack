import {
  BillBoard as BillboardType,
  Size as SizeType,
  Color as ColorType,
} from "@prisma/client";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ImSearch } from "react-icons/im";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Billboard } from "./Billboard";
import { Product } from "./Product";
import { CategoryChild, ProductChild } from "@/types/types";
import { Size } from "./Size";
import { Color } from "./Color";
import { Category } from "./Category";
import { useSearch } from "../lib/queries/search";
import { AiFillCloseCircle } from "react-icons/ai";
import { Spinner } from "./Spinner";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { Sort } from "./Sort";

const lookup = {
  Billboards: Billboard,
  Categories: Category,
  Products: Product,
  Sizes: Size,
  Colors: Color,
};

interface renderSectionsProps {
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  isSearching: boolean;
  data: any[];
}

const RenderSections: React.FC<renderSectionsProps> = ({
  title,
  isSearching,
  data,
}) => {
  const Component = lookup[title];

  if (isSearching) return <Spinner />;

  return <>{data?.map((item) => <Component data={item} key={item.id} />)}</>;
};

interface SectionContainerProps {
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings?: string[];
  data: BillboardType[] | ProductChild[] | SizeType[] | ColorType[];
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  count: number;
}

export enum SortType {
  LATEST,
  OLDEST,
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  headings,
  data,
  setPage,
  page,
  count,
  section,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [sort, setSort] = useState<SortType>(SortType.LATEST);

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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setIsSearch(true);
    setSearchPage(1);
    setSearchQuery(searchQuery);
    refetch();
  };

  const finalData = isSearch ? results : data;
  console.log(finalData);
  return (
    <div className="bg-neutral-800 p-3 rounded-md flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0  justify-between  sm:items-center ">
        <h1>{title}</h1>
        <div className="flex gap-2 items-center">
          <SearchBar
            setIsSearch={setIsSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearch={isSearch}
            handleSearch={handleSearch}
          />
          <Sort setSort={setSort} />
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left border-b-2 border-neutral-700 ">
            {headings &&
              headings.map((heading, i) => (
                <th className="py-2" key={i}>
                  {heading}
                </th>
              ))}
          </tr>
        </thead>
        <RenderSections
          data={finalData}
          title={title}
          isSearching={isSearching}
        />
      </table>
      {isSearch ? (
        <Pagination
          page={searchPage}
          count={searchCount}
          setPage={setSearchPage}
        />
      ) : (
        <Pagination page={page} count={count} setPage={setPage} />
      )}
    </div>
  );
};
