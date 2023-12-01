import { QueryKey } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type DeleteQueryProps = {
  endpoint: string;
  queryKey: QueryKey;
};
export const useDeleteQuery = (props: DeleteQueryProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: remove,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/${props.endpoint}?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body);
      }

      return response;
    },
    onError: (error) => {
      throw error;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [props.queryKey] }),
  });

  return { remove, isDeleting, isError, error };
};
