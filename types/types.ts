import { ValidationSchema } from "@/app/lib/utils";
import {
  BillboardPayload,
  UpdateBillboardPayload,
} from "@/app/lib/validators/Billboard";
import { ProductPayload } from "@/app/lib/validators/Product";
import { BrandPayload } from "@/app/lib/validators/brand";
import { CartItemPayload } from "@/app/lib/validators/cartItem";
import { CategoryPayload } from "@/app/lib/validators/category";
import { ColorPayload } from "@/app/lib/validators/color";
import { OrderPayload } from "@/app/lib/validators/order";
import { SizePayload } from "@/app/lib/validators/size";
import { VariantPayload } from "@/app/lib/validators/variant";
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

export type PayloadType =
  | BillboardPayload
  | CategoryPayload
  | ProductPayload
  | SizePayload
  | ColorPayload
  | CartItemPayload
  | OrderPayload
  | BrandPayload;

export type ProductChild = Product & {
  category: Category;
  size: Size;
  color: Color;
  billboard: BillBoard;
  user: User;
};

export type SortType = "LATEST" | "OLDEST";

export type SortObjectType = {
  title: string;
  value: SortType;
};

export type TitleType =
  | "Billboards"
  | "Categories"
  | "Products"
  | "Sizes"
  | "Colors"
  | "Brands";
export type SectionType =
  | "billBoard"
  | "color"
  | "size"
  | "product"
  | "category"
  | "brand";

export type EndpointType =
  | "billboard"
  | "color"
  | "size"
  | "product"
  | "category"
  | "filter"
  | "checkout"
  | "cart"
  | "store"
  | "brand"
  | any;
export type QueryKey =
  | "billboards"
  | "products"
  | "categories"
  | "search"
  | "sizes"
  | "colors"
  | "filters"
  | "product"
  | "cart"
  | "store"
  | "brands";

export type ValidateTypePayload =
  | BillboardPayload
  | ProductPayload
  | CategoryPayload
  | SizePayload
  | ColorPayload
  | BrandPayload
  | VariantPayload;

export type Validator<T> = (inputs: T) => T;

export type UpdatePayload = UpdateBillboardPayload;

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
