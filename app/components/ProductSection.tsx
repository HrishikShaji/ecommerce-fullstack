"use client";
import Search from "./ui/Search";
import Table from "./ui/Table";
import { SortObjectType } from "@/types/types";
import { Sort } from "./ui/Sort";
import { Pagination } from "./ui/Pagination";
import { useDataTable } from "./ui/hooks/useDataTable";
import { Spinner } from "./ui/Spinner";
import ProductForm from "./ProductForm";

const productSortValues: SortObjectType[] = [
  {
    title: "Latest",
    value: "LATEST",
  },
  {
    title: "Oldest",
    value: "OLDEST",
  },
];

const ProductSection = () => {
  const {
    data,
    count,
    isLoading,
    page,
    isError,
    setPage,
    setSearchString,
    setSort,
  } = useDataTable({
    endpoint: "product",
    section: "product",
    queryKey: "products",
    initialSortObj: productSortValues[0],
  });

  if (isError) return null;

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-6 px-2">
        <h1 className="font-semibold text-2xl">Add Products </h1>
        <ProductForm />
      </div>
      <div className=" flex flex-col gap-6">
        <div className="flex justify-between w-full px-2">
          <h1 className="text-2xl font-semibold">Products</h1>
          <div className="flex gap-3">
            <Search onChange={setSearchString} />
            <Sort setSort={setSort} sortItems={productSortValues} />
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            lookup={[
              "name",
              "billboard",
              "category",
              "size",
              "color",
              "createdAt",
              "price",
            ]}
            endpoint="product"
            queryKey="products"
            data={data}
            headings={[
              "Product",
              "Billboard",
              "Category",
              "Size",
              "Color",
              "Date",
              "Price",
            ]}
            mode="product"
          />
        )}
      </div>
      <Pagination count={count} page={page} setPage={setPage} />
    </div>
  );
};

export default ProductSection;
