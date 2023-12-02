import { QueryKey, SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export type FilterQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
  colorId?: string;
};
export const useFilterQuery = (props: FilterQueryProps) => {
  const {
    data: response,
    isError,
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: [props.queryKey],
    queryFn: async () => {
      const response = await fetch(
        `/api/${props.endpoint}?page=${props.page}&sort=${props.sort}&colorId=${props.colorId}`,
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
  return { count, data, error, isError, refetch, isLoading };
};
