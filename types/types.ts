import { PayloadType } from "@/app/lib/utils";
import { BillboardPayload } from "@/app/lib/validators/Billboard";
import { ProductPayload } from "@/app/lib/validators/Product";
import { CategoryPayload } from "@/app/lib/validators/category";
import { ColorPayload } from "@/app/lib/validators/color";
import { SizePayload } from "@/app/lib/validators/size";
import {
  BillBoard,
  Category,
  Color,
  Product,
  Size,
  User,
} from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

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

export type EndpointType =
  | "billboard"
  | "color"
  | "size"
  | "product"
  | "category";
export type QueryKey =
  | "billboards"
  | "products"
  | "categories"
  | "search"
  | "sizes"
  | "colors";

export type ValidateTypePayload =
  | BillboardPayload
  | ProductPayload
  | CategoryPayload
  | SizePayload
  | ColorPayload;

export type Validator<T> = (inputs: T) => T;

export type AddQueryProps = {
  validator: (inputs: PayloadType) => typeof inputs;
  endpoint: string;
  queryKey: QueryKey;
  reset: () => void;
};

export type GetQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
};
export type DeleteQueryProps = {
  endpoint: string;
  queryKey: QueryKey;
};

export type UpdatePayload = {
  name: string;
  id: string;
};

export type UpdateQueryProps = {
  endpoint: string;
  queryKey: QueryKey;
};

export type SelectItem = {
  name: string;
  id: string;
};

export type SearchType =
  | BillBoard
  | CategoryChild
  | ProductChild
  | Size
  | Color;

export type InputItem = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export type DropdownInputItem = {
  selectedItem: SelectItem;
  setSelectedItem: Dispatch<SetStateAction<SelectItem>>;
  url: string;
  query: string;
  name: string;
  label: string;
};
