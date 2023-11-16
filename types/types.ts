import {
  BillBoard,
  Category,
  Color,
  Product,
  Size,
  User,
} from "@prisma/client";

export type CategoryChild = Category & {
  children: CategoryChild[];
};

export type ProductChild = Product & {
  category: Category;
  size: Size;
  color: Color;
  billboard: BillBoard;
  user: User;
};

export type SortType = "LATEST" | "OLDEST";
export type TitleType =
  | "Billboards"
  | "Categories"
  | "Products"
  | "Sizes"
  | "Colors";
export type SectionType =
  | "billBoard"
  | "color"
  | "size"
  | "product"
  | "category";
