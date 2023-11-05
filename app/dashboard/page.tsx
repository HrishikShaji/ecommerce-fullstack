import { getData } from "../lib/utils";

export default async function Page() {
  const data = await getData();
  return (
    <div className="p-10 text-white flex flex-col gap-10">
      <h1>{data}</h1>
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
