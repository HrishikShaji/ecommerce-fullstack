"use client";

import BillBoardSection from "../components/BillboardSection";
import CategorySection from "../components/CategorySection";

const Page = () => {
  return (
    <div className="w-full p-10 text-white">
      <BillBoardSection />
      <CategorySection />
    </div>
  );
};

export default Page;
