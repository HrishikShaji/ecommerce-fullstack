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
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Billboard } from "./Billboard";
import { Product } from "./Product";
import { CategoryChild, ProductChild } from "@/types/types";
import { Size } from "./Size";
import { Color } from "./Color";
import { Category } from "./Category";
import { itemsPerPage } from "../lib/utils";
import { useSearch } from "../lib/queries/search";
import { AiFillCloseCircle } from "react-icons/ai";

interface SectionContainerProps {
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings?: string[];
  data: BillboardType[] | ProductChild[] | SizeType[] | ColorType[];
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  count: number;
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
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {}, [searchPage, section, searchQuery]);
  const {
    results,
    refetch,
    count: searchCount,
  } = useSearch({
    page: searchPage,
    section: section,
    searchString: searchQuery,
  });
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log(searchQuery);
    setSearchQuery(searchQuery);
    refetch();
    if (isSearch) {
      setSearchQuery("");
    }
  };
  console.log(results, searchCount);
  return (
    <div className="bg-neutral-800 p-3 rounded-md flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0  justify-between  sm:items-center ">
        <h1>{title}</h1>
        <div className="flex gap-2 items-center">
          <form
            onSubmit={(e) => {
              setIsSearch(!isSearch);
              handleSearch(e);
            }}
            className="relative text-black flex items-center "
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-md p-1"
            />
            <button className="absolute right-2 ">
              {isSearch ? <AiFillCloseCircle /> : <ImSearch color="black" />}
            </button>
          </form>
          <div className="relative flex gap-2 bg-neutral-700 py-1 px-2 items-center rounded-md">
            <h1>Sort</h1>
            <button onClick={() => setIsSortOpen(!isSortOpen)}>
              <IoMdArrowDropdownCircle />
            </button>
            {isSortOpen && (
              <div className="absolute w-[200px] h-[200px] top-10 right-0 rounded-md bg-white"></div>
            )}
          </div>
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
        {title === "Billboards"
          ? isSearch
            ? results?.map((billboard: BillboardType) => (
                <Billboard
                  billboard={billboard as BillboardType}
                  key={billboard.id}
                />
              ))
            : data?.map((billboard) => (
                <Billboard
                  billboard={billboard as BillboardType}
                  key={billboard.id}
                />
              ))
          : null}
        {title === "Products" &&
          data?.map((product) => {
            return (
              <Product product={product as ProductChild} key={product.id} />
            );
          })}
        {title === "Sizes" &&
          data?.map((size) => {
            return <Size size={size as SizeType} key={size.id} />;
          })}
        {title === "Colors" &&
          data?.map((color) => {
            return <Color color={color as ColorType} key={color.id} />;
          })}
      </table>
      {title === "Categories" &&
        data?.map((categories) => {
          return (
            <Category
              category={categories as CategoryChild}
              key={categories.id}
            />
          );
        })}
      <div className="w-full flex gap-2 justify-end">
        <button
          disabled={isSearch ? searchPage === 1 : page === 1}
          onClick={() => {
            isSearch
              ? setSearchPage((prevState: number) => {
                  return prevState - 1;
                })
              : setPage((prevState: number) => {
                  return prevState - 1;
                });
          }}
        >
          <BsArrowLeftSquareFill />
        </button>
        <button
          disabled={
            isSearch
              ? searchPage * itemsPerPage >= searchCount
              : page * itemsPerPage >= count
          }
          onClick={() => {
            isSearch
              ? setSearchPage((prevState: number) => {
                  return prevState + 1;
                })
              : setPage((prevState: number) => {
                  return prevState + 1;
                });
          }}
        >
          <BsArrowRightSquareFill />
        </button>
      </div>
    </div>
  );
};
