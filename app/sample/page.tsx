"use client";

import BillBoardSection from "../components/BillboardSection";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import SizeSection from "../components/SizeSection";

const Page = () => {
  return (
    <div className="w-full p-10 text-white">
      <BillBoardSection />
      <CategorySection />
      <ProductSection />
      <SizeSection />
    </div>
  );
};

export default Page;
