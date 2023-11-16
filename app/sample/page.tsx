"use client";

import { Section } from "../components/Section";
import {
  AddQueryProps,
  GetQueryProps,
  QueryKey,
  ValidateTypePayload,
  Validator,
  useAddQuery,
  useGetQuery,
} from "../lib/queries/customQuery";
import { validateBillboardPayload } from "../lib/validators/Billboard";
import { validateCategoryPayload } from "../lib/validators/category";
import { validateProductPayload } from "../lib/validators/Product";
import { validateSizePayload } from "../lib/validators/size";
import { validateColorPayload } from "../lib/validators/color";
import { useState } from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import { SectionType, TitleType } from "@/types/types";

type SectionProps<T> = {
  endpoint: string;
  heading: string;
  label: string;
  placeholder: string;
  name: string;
  queryKey: QueryKey;
  validator: Validator<T>;
  customGetHook: (values: GetQueryProps) => {
    count: number;
    data: any[];
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
  };
  customAddHook: (values: AddQueryProps<T>) => {
    add: UseMutateFunction<Response, Error, T, unknown>;
    isPending: boolean;
    isError: boolean;
  };
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings: string[];
};
const sections = [
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

const Page = () => {
  const [showSection, setShowSection] = useState(
    Array(sections.length).fill(false),
  );
  return (
    <div className="text-white p-10 flex flex-col gap-4">
      {sections.map((section, i) => {
        return (
          <div key={i}>
            <div
              className="p-2  w-full font-semibold cursor-pointer text-xl bg-neutral-800 hover:bg-neutral-700"
              onClick={() => {
                const newShowSections = [...showSection];
                newShowSections[i] = !newShowSections[i];
                setShowSection(newShowSections);
              }}
            >
              {section.title}
            </div>
            {showSection[i] && (
              <Section
                endpoint={section.endpoint}
                queryKey={section.queryKey as QueryKey}
                validator={section.validator as Validator<ValidateTypePayload>}
                heading={section.heading}
                label={section.label}
                placeholder={section.placeholder}
                name={section.name}
                headings={section.headings}
                customAddHook={section.customAddHook}
                customGetHook={section.customGetHook}
                title={section.title as TitleType}
                section={section.section as SectionType}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
