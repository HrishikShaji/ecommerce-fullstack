"use client";

import ProductForm from "../components/ProductForm";
import { Slider } from "../components/ui/Slider";

const Page = () => {
  return (
    <div className="text-white h-screen w-full flex justify-center items-center flex-col gap-10 ">
      <ProductForm />
    </div>
  );
};

export default Page;
