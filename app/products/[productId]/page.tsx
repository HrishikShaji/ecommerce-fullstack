"use client";
import { useParams } from "next/navigation";

const Page = () => {
  const { productId } = useParams();
  return (
    <div className="text-white p-20">
      <h1>Product {productId}</h1>
    </div>
  );
};

export default Page;
