import { GetQueryProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useGetQuery = ({
  page,
  sort,
  endpoint,
  queryKey,
}: GetQueryProps) => {
  const {
    data: response,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await fetch(
        `/api/${endpoint}?page=${page}&sort=${sort}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.json();
    },
  });

  const data = response?.data;
  const count = response?.count;
  return { count, data, isError, refetch, isLoading };
};
