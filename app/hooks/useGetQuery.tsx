import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export type GetQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
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
    queryKey: [props.queryKey],
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
  return {
    isSuccess,
    count,
    data,
    error,
    isError,
    refetch,
    isLoading,
    slugProducts,
  };
};
