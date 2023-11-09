import {
  BillBoard as BillboardType,
  Size as SizeType,
  Color as ColorType,
} from "@prisma/client";
import { useState } from "react";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";
import { ImSearch } from "react-icons/im";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Billboard } from "./Billboard";
import { Product } from "./Product";
import { ProductChild } from "@/types/types";
import { Size } from "./Size";
import { Color } from "./Color";

interface SectionContainerProps {
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  headings: string[];
  data: BillboardType[] | ProductChild[] | SizeType[] | ColorType[];
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  headings,
  data,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  return (
    <div className="bg-neutral-700 p-3 rounded-md flex flex-col gap-2">
      <div className="flex justify-between items-center ">
        <h1>{title}</h1>
        <div className="flex gap-2 items-center">
          <form className="relative flex items-center ">
            <input className="rounded-md p-1" />
            <button className="absolute right-2 ">
              <ImSearch color="black" />
            </button>
          </form>
          <div className="relative flex gap-2 bg-neutral-800 py-1 px-2 items-center rounded-md">
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
        <tr className="text-left">
          {headings.map((heading, i) => (
            <th key={i}>{heading}</th>
          ))}
        </tr>
        {title === "Billboards" &&
          data.map((billboard) => {
            return (
              <Billboard
                billboard={billboard as BillboardType}
                key={billboard.id}
              />
            );
          })}
        {title === "Products" &&
          data.map((product) => {
            return (
              <Product product={product as ProductChild} key={product.id} />
            );
          })}
        {title === "Sizes" &&
          data.map((size) => {
            return <Size size={size as SizeType} key={size.id} />;
          })}
        {title === "Colors" &&
          data.map((color) => {
            return <Color color={color as ColorType} key={color.id} />;
          })}
      </table>
      <div className="w-full flex gap-2 justify-end">
        <button>
          <BsArrowLeftSquareFill />
        </button>
        <button>
          <BsArrowRightSquareFill />
        </button>
      </div>
    </div>
  );
};
