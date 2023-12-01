import { PayloadType, QueryKey } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type AddQueryProps = {
  endpoint: string;
  queryKey: QueryKey;
  reset: () => void;
};
export const useAddQuery = (props: AddQueryProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: add,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload: PayloadType) => {
      const response = await fetch(`/api/${props.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    onSuccess: () => {
      props.reset();
      queryClient.invalidateQueries({ queryKey: [props.queryKey] });
    },
  });

  return { add, isPending, isError, error };
};
