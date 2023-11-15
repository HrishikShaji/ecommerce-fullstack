import { SortType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useSort = ({
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
  console.log(page, section, searchString, sort);
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
    enabled: false,
  });

  const results = data?.searchResults;
  const count = data?.count;
  return { count, results, isError, refetch, isLoading };
};
