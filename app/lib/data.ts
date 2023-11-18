import { useAddQuery, useGetQuery } from "../lib/queries/customQuery";
import { validateBillboardPayload } from "../lib/validators/Billboard";
import { validateCategoryPayload } from "../lib/validators/category";
import { validateProductPayload } from "../lib/validators/Product";
import { validateSizePayload } from "../lib/validators/size";
import { validateColorPayload } from "../lib/validators/color";
import { EndpointType } from "@/types/types";
import { QueryKey } from "@/types/types";

export const sectionsData = [
  {
    endpoint: "billboard",
    queryKey: "billboards",
    validator: validateBillboardPayload,
    heading: "Add Billboards",
    label: "Billboard",
    placeholder: "Billboard",
    name: "name",
    headings: ["Billboard", "Date"],
    customAddHook: useAddQuery,
    customGetHook: useGetQuery,
    title: "Billboards",
    section: "billBoard",
  },
  {
    endpoint: "category",
    queryKey: "categories",
    validator: validateCategoryPayload,
    heading: "Add Categories",
    label: "Category",
    placeholder: "Category",
    name: "name",
    headings: ["Category"],
    customAddHook: useAddQuery,
    customGetHook: useGetQuery,
    title: "Categories",
    section: "category",
  },
  {
    endpoint: "product",
    queryKey: "products",
    validator: validateProductPayload,
    heading: "Add Products",
    label: "Product",
    placeholder: "Product",
    name: "name",
    headings: ["Product", "Category", "Billboard", "Size", "Color", "Username"],
    customAddHook: useAddQuery,
    customGetHook: useGetQuery,
    title: "Products",
    section: "product",
  },
  {
    endpoint: "size",
    queryKey: "sizes",
    validator: validateSizePayload,
    heading: "Add Sizes",
    label: "Size",
    placeholder: "Size",
    name: "name",
    headings: ["Size", "Date"],
    customAddHook: useAddQuery,
    customGetHook: useGetQuery,
    title: "Sizes",
    section: "size",
  },
  {
    endpoint: "color",
    queryKey: "colors",
    validator: validateColorPayload,
    heading: "Add Colors",
    label: "Color",
    placeholder: "Color",
    name: "name",
    headings: ["Color", "Date"],
    customAddHook: useAddQuery,
    customGetHook: useGetQuery,
    title: "Colors",
    section: "color",
  },
];

export type InputValuesDataType = {
  name: string;
  placeholder?: string;
  label?: string;
  type: "DropDown" | "Input";
  endpoint?: EndpointType;
  queryKey?: QueryKey;
};

export const inputValuesData: InputValuesDataType[] = [
  {
    name: "name",
    placeholder: "name...",
    label: "Name",
    type: "Input",
  },
  {
    name: "age",
    placeholder: "age...",
    label: "Age",
    type: "Input",
  },
  {
    name: "birth",
    placeholder: "birth...",
    label: "Birthday",
    type: "Input",
  },
  {
    name: "billboard",
    placeholder: "age...",
    label: "dropyyy",
    type: "DropDown",
    endpoint: "billboard",
    queryKey: "billboards",
  },
  {
    name: "category",
    placeholder: "drop...",
    label: "Birthday",
    type: "DropDown",
    endpoint: "category",
    queryKey: "categories",
  },
];

export const productInputInitialObj = {
  name: "",
};

export type FinalInputType = InputValuesDataType & {
  value: string;
};

export const productInputValues: InputValuesDataType[] = [
  {
    name: "name",
    placeholder: "name...",
    label: "Name",
    type: "Input",
  },
  {
    label: "Category",
    endpoint: "category",
    queryKey: "categories",
    name: "categoryId",
    type: "DropDown",
  },
  {
    label: "Billboard",
    endpoint: "billboard",
    queryKey: "billboards",
    name: "billboardId",
    type: "DropDown",
  },
  {
    label: "Size",
    endpoint: "size",
    queryKey: "sizes",
    name: "sizeId",
    type: "DropDown",
  },
  {
    label: "Color",
    endpoint: "color",
    queryKey: "colors",
    name: "colorId",
    type: "DropDown",
  },
];
