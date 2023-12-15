import Link from "next/link";
import { useGetQuery } from "../hooks/useGetQuery";
import { CategoryChild } from "@/types/types";
import Image from "next/image";

export const CategoryTiles = () => {
  const { data, isError, isLoading } = useGetQuery({
    endpoint: "category",
    queryKey: "categories",
    page: 1,
    sort: "LATEST",
  });
  console.log(data);
  function getCategoryChildren(categories: CategoryChild[]) {
    const getSubs = (categories: CategoryChild[]): CategoryChild[] => {
      let subCats: CategoryChild[] = [];
      categories.forEach((category) => {
        subCats.push(category);
        if (category.children) {
          subCats = subCats.concat(getSubs(category.children));
        }
      });
      return subCats;
    };
    return getSubs(categories);
  }

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const all = getCategoryChildren(data);

  return (
    <div className="h-40 w-full">
      <div className="grid grid-cols-3 gap-10">
        {data.map((item: CategoryChild) => (
          <Link
            href={`/products?categoryId=${item.id}`}
            key={item.id}
            className=" h-full relative w-full "
          >
            <Image
              src={item.images[0]}
              alt="image"
              height={1000}
              width={1000}
              className="h-60 w-full rounded-3xl object-center object-cover"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
