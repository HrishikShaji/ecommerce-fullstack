import { useQuery } from "@tanstack/react-query";

export const useSearch = ({
  page,
  section,
  searchString,
}: {
  page: number;
  section: string;
  searchString: string;
}) => {
  console.log(page, section, searchString);
  const { data, isError, refetch, isLoading } = useQuery({
    queryKey: [`${section}Search`],
    queryFn: async () => {
      const response = await fetch(
        `/api/search?page=${page}&section=${section}&searchString=${searchString}`,
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
