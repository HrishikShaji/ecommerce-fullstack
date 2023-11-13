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
import { Spinner } from "./Spinner";

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

  const {
    results,
    refetch,
    count: searchCount,
    isLoading: isSearching,
  } = useSearch({
    page: searchPage,
    section: section,
    searchString: searchQuery,
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
        {title === "Billboards" &&
          (isSearching ? (
            <Spinner />
          ) : (
            finalData?.map((billboard: BillboardType) => (
              <Billboard
                billboard={billboard as BillboardType}
                key={billboard.id}
              />
            ))
          ))}
        {title === "Products" &&
          (isSearching ? (
            <Spinner />
          ) : (
            finalData?.map((product: ProductChild) => {
              return (
                <Product product={product as ProductChild} key={product.id} />
              );
            })
          ))}
        {title === "Sizes" &&
          (isSearching ? (
            <Spinner />
          ) : (
            finalData?.map((size: SizeType) => {
              return <Size size={size as SizeType} key={size.id} />;
            })
          ))}
        {title === "Colors" &&
          (isSearching ? (
            <Spinner />
          ) : (
            finalData?.map((color: ColorType) => {
              return <Color color={color as ColorType} key={color.id} />;
            })
          ))}
      </table>
      {title === "Categories" &&
        (isSearching ? (
          <Spinner />
        ) : (
          finalData?.map((categories: CategoryChild) => {
            return (
              <Category
                category={categories as CategoryChild}
                key={categories.id}
              />
            );
          })
        ))}
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
