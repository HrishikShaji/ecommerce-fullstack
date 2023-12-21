"use client";
import Search from "./ui/Search";
import Table from "./ui/Table";
import { SortObjectType } from "@/types/types";
import { Sort } from "./ui/Sort";
import { Pagination } from "./ui/Pagination";
import { useDataTable } from "./ui/hooks/useDataTable";
import { Spinner } from "./ui/Spinner";
import ProductForm from "./ProductForm";
import { useParams } from "next/navigation";

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
  const { userId, storeId } = useParams();
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
    endpoint: `${userId}/store/${storeId}/product`,
    section: "product",
    queryKey: "products",
    initialSortObj: productSortValues[0],
  });

  if (isError) return <div>Error</div>;

  const newData = data
    ?.map((product: any) => {
      return product.variants.map((variant: any) => {
        return {
          id: product.id,
          name: product.name,
          billboardId: product.billboardId,
          categoryId: product.categoryId,
          brandId: product.brandId,
          billboard: product.billboard.name,
          category: product.category.name,
          brand: product.brand.name,
          color: variant.color.name,
          size: variant.size.name,
          price: variant.price,
          slug: product.slug,
          variantId: variant.id,
          discount: variant.discount,
        };
      });
    })
    .flat();

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
              "size",
              "color",
              "price",
              "brand",
              "discount",
              "slug",
              "billboard",
              "category",
            ]}
            endpoint={`${userId}/store/${storeId}/product`}
            queryKey="products"
            data={newData}
            headings={[
              "Product",
              "Size",
              "Color",
              "Price",
              "Brand",
              "Discount",
              "Slug",
              "Billboard",
              "Category",
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
