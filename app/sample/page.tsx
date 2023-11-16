"use client";

import { useState } from "react";
import { Form } from "../components/Form";
import { Section } from "../components/Section";
import { useAddBillboard, useGetBillboards } from "../lib/queries/billboard";
import { useAddQuery, useGetQuery } from "../lib/queries/customQuery";
import { validateBillboardPayload } from "../lib/validators/Billboard";
import { validateCategoryPayload } from "../lib/validators/category";
import { validateProductPayload } from "../lib/validators/Product";
import { validateSizePayload } from "../lib/validators/size";
import { validateColorPayload } from "../lib/validators/color";

const Page = () => {
  return (
    <div className="h-screen w-full justify-center items-center">
      <Section
        endpoint="billboard"
        queryKey="billboards"
        validator={validateBillboardPayload}
        heading="Add Billboards"
        label="Billboard"
        placeholder="Billboard"
        name="name"
        headings={["Billboard", "Date"]}
        customAddHook={useAddQuery}
        customGetHook={useGetQuery}
        title="Billboards"
        section="billBoard"
      />
      <Section
        endpoint="category"
        queryKey="categories"
        validator={validateCategoryPayload}
        heading="Add Categories"
        label="Category"
        placeholder="Category"
        name="name"
        headings={["Category"]}
        customAddHook={useAddQuery}
        customGetHook={useGetQuery}
        title="Categories"
        section="category"
      />
      <Section
        endpoint="product"
        queryKey="products"
        validator={validateProductPayload}
        heading="Add Products"
        label="Product"
        placeholder="Product"
        name="name"
        headings={[
          "Product",
          "Category",
          "Billboard",
          "Size",
          "Color",
          "Username",
        ]}
        customAddHook={useAddQuery}
        customGetHook={useGetQuery}
        title="Products"
        section="product"
      />
      <Section
        endpoint="size"
        queryKey="sizes"
        validator={validateSizePayload}
        heading="Add Sizes"
        label="Size"
        placeholder="Size"
        name="name"
        headings={["Size", "Date"]}
        customAddHook={useAddQuery}
        customGetHook={useGetQuery}
        title="Sizes"
        section="size"
      />
      <Section
        endpoint="color"
        queryKey="colors"
        validator={validateColorPayload}
        heading="Add Colors"
        label="Color"
        placeholder="Color"
        name="name"
        headings={["Color", "Date"]}
        customAddHook={useAddQuery}
        customGetHook={useGetQuery}
        title="Colors"
        section="color"
      />
    </div>
  );
};

export default Page;
