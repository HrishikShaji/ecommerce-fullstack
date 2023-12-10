"use client";

import BillBoardSection from "@/app/components/BillboardSection";
import ProductSection from "@/app/components/ProductSection";
import { useParams } from "next/navigation";

const Page = () => {
  const { userId, storeId } = useParams();
  return (
    <div className="p-10 text-white flex flex-col gap-2">
      user is {userId} and store is {storeId}
      <BillBoardSection />
      <ProductSection />
    </div>
  );
};

export default Page;
