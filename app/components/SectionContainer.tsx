import { Dispatch, SetStateAction, useState } from "react";
import { Billboard } from "./Billboard";
import { Product } from "./Product";
import { SearchType, SortType } from "@/types/types";
import { Size } from "./Size";
import { Color } from "./Color";
import { Category } from "./Category";
import { Spinner } from "./Spinner";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { Sort } from "./Sort";

interface ComponentProps {
  data: SearchType;
}

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
  data: SearchType[];
  headings: string[];
}

const RenderSections: React.FC<renderSectionsProps> = ({
  title,
  isSearching,
  data,
  headings,
}) => {
  const Component = lookup[title] as React.FC<ComponentProps>;

  if (isSearching) return <Spinner />;
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }
  const size = headings.length + 1;
  return (
    <div className="w-full">
      <div
        className={`text-left border-b-2 grid grid-cols-${size} border-neutral-700 `}
      >
        {headings &&
          headings.map((heading, i) => (
            <div className="py-2" key={i}>
              {heading}
            </div>
          ))}
      </div>
      {data?.map((item) => <Component data={item} key={item.id} />)}
    </div>
  );
};

interface SectionContainerProps {
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings: string[];
  data: SearchType[];
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  count: number;
  setSort: Dispatch<SetStateAction<SortType>>;
  sort: SortType;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  headings,
  data,
  setPage,
  page,
  count,
  section,
  setSort,
  sort,
}) => {
  const [searchPage, setSearchPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchType[] | []>([]);

  const finalData = isSearch ? searchResults : data;
  return (
    <div className="bg-neutral-800 p-3 rounded-md flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0  justify-between  sm:items-center ">
        <h1>{title}</h1>
        <div className="flex gap-2 items-center">
          <SearchBar
            setIsSearch={setIsSearch}
            setIsSearching={setIsSearching}
            setSearchCount={setSearchCount}
            isSearch={isSearch}
            setSearchPage={setSearchPage}
            setSearchResults={setSearchResults}
            section={section}
            searchPage={searchPage}
            sort={sort}
          />
          <Sort setSort={setSort} />
        </div>
      </div>
      <RenderSections
        data={finalData}
        title={title}
        isSearching={isSearching}
        headings={headings}
      />
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
