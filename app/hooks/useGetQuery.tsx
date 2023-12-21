import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export type GetQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKeys: any[];
};
export const useGetQuery = (props: GetQueryProps) => {
  const {
    data: response,
    isError,
    refetch,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: props.queryKeys,
    queryFn: async () => {
      const response = await fetch(
        `/api/${props.endpoint}?page=${props.page}&sort=${props.sort}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body);
      }
      return response.json();
    },
  });

  const data = response?.data;
  const count = response?.count;
  const slugProducts = response?.sameSlugProducts;
  const subCategories = response?.subCategories;
  return {
    isSuccess,
    count,
    data,
    error,
    isError,
    refetch,
    isLoading,
    slugProducts,
    subCategories,
  };
};
