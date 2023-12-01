import { UpdateBillboardPayload } from "../lib/validators/Billboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/types/types";

export type UpdateQueryProps = {
  endpoint: string;
  queryKey: QueryKey;
};
export const useUpdateQuery = (props: UpdateQueryProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload: UpdateBillboardPayload) => {
      const response = await fetch(`/api/${props.endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json();
        throw new Error(body);
      }
    },
    onError: (error) => {
      throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [props.queryKey] });
    },
  });

  return { update, isPending, isError, error };
};
