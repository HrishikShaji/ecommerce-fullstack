import { Category as CategoryType } from "@prisma/client";
import { CategorySection } from "../components/CategorySection";
import { baseUrl } from "../lib/connect";
import { Category } from "../components/Category";

async function getData(url: string) {
  const response = await fetch(url, {
    cache: "no-store",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
}

const Page = async () => {
  const categories = await getData(`${baseUrl}/api/category`);
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <CategorySection />
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Categories</h1>
        <div className="flex flex-col gap-2">
          {categories.map((category: CategoryType) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
