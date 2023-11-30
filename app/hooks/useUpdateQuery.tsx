import { UpdateQueryProps } from "@/types/types";
import { UpdateBillboardPayload } from "../lib/validators/Billboard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validatePayload } from "../lib/utils";

export const useUpdateQuery = <T extends UpdateBillboardPayload>({
  endpoint,
  queryKey,
  validator,
}: UpdateQueryProps<T>) => {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload: UpdateBillboardPayload) => {
      await fetch(`/api/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { update, isPending, isError, error };
};
