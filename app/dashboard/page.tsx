"use client";
import { useState } from "react";
import { CategorySection } from "../components/CategorySection";
import { ProductSection } from "../components/ProductSection";
const Page = () => {
  const [categorySectionOpen, setCategorySectionOpen] = useState(false);
  const [productSectionOpen, setProductSectionOpen] = useState(false);

  return (
    <div className="text-white p-10 flex flex-col gap-4">
      <div
        className="p-2 pl-4 w-full font-semibold cursor-pointer text-xl bg-neutral-800 hover:bg-neutral-700"
        onClick={() => setCategorySectionOpen(!categorySectionOpen)}
      >
        Category
      </div>
      {categorySectionOpen && <CategorySection />}
      <div
        className="p-2 pl-4 w-full font-semibold cursor-pointer text-xl bg-neutral-800 hover:bg-neutral-700"
        onClick={() => setProductSectionOpen(!productSectionOpen)}
      >
        Product
      </div>
      {productSectionOpen && <ProductSection />}
    </div>
  );
};

export default Page;
