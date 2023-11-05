import { CategorySection } from "../components/CategorySection";
import { baseUrl } from "../lib/connect";
import { Category } from "../components/Category";
import { CategoryChild } from "@/types/types";

async function getData(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { tags: ["categories"] },
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

const Page = async () => {
  const categories = await getData(`${baseUrl}/api/category`);
  if (!categories) {
    return <div>Loading</div>;
  }

  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <CategorySection />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Categories</h1>

        <h1>{categories[0].name}</h1>
        {/*
				
        <div className="flex flex-col gap-2 w-full">
          {categories.map((category: CategoryChild) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
				*/}
      </div>
    </div>
  );
};

export default Page;
