import { CategorySection } from "../components/CategorySection";
import { baseUrl } from "../lib/connect";
import { Category } from "../components/Category";
import { CategoryChild } from "@/types/types";

async function getData() {
  const response = await fetch(`${baseUrl}api/sample`, {
    cache: "no-store",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Error fetching data");
  }
  return response.json();
}

export default async function Page() {
  console.log(baseUrl);
  const categories = await getData();
  if (!categories) return <div>NOthing here</div>;
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <CategorySection />
      {categories}
      {/*  

      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Categories</h1>

        <div className="flex flex-col gap-2 w-full">
          {categories?.map((category: CategoryChild) => (
            <Category key={category.id} category={category} />
          ))}
        </div>
      </div>
*/}
    </div>
  );
}
