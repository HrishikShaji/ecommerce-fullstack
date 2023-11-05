import { CategorySection } from "../components/CategorySection";
import { getData } from "../lib/utils";

const Page = async () => {
  const categories = await getData();
  console.log(categories);
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <CategorySection />

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
};
export default Page;
