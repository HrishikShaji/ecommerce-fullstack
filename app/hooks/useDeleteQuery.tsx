import { DeleteQueryProps } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteQuery = ({ endpoint, queryKey }: DeleteQueryProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: remove,
    isPending: isDeleting,
    error,
    isError,
  } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/${endpoint}?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>{`Error deleting ${endpoint}`}</div>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [queryKey] }),
  });

  return { remove, isDeleting, isError, error };
};
