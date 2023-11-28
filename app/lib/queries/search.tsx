import { useQuery } from "@tanstack/react-query";
import { SortType } from "@/types/types";

export const useSearch = ({
  page,
  section,
  searchString,
  sort,
}: {
  page: number;
  section: string;
  searchString: string;
  sort: SortType;
}) => {
  const { data, isError, refetch, isLoading } = useQuery({
    queryKey: [`${section}Search`],
    queryFn: async () => {
      const response = await fetch(
        `/api/search?page=${page}&section=${section}&searchString=${searchString}&sort=${sort}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.json();
    },
  });

  const results = data?.searchResults;
  const count = data?.count;
  return { count, results, isError, refetch, isLoading };
};
