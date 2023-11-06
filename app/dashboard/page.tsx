"use client";
import { CategorySection } from "../components/CategorySection";
import { baseUrl } from "../lib/connect";
import { Category } from "../components/Category";
import { CategoryChild } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../components/Spinner";

const Page = () => {
  const {
    data: categories,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });
  console.log(categories);
  if (isError) return null;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <CategorySection />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Categories</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {categories.map((category: CategoryChild) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
