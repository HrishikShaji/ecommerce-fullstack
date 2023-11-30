import { AddQueryProps, PayloadType, ValidateTypePayload } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validatePayload } from "../lib/utils";

export const useAddQuery = <T extends ValidateTypePayload>({
  validator,
  endpoint,
  queryKey,
  reset,
}: AddQueryProps<T>) => {
  const queryClient = useQueryClient();
  const {
    mutate: add,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload: PayloadType) => {
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to Fetch Data");
      }
      return response;
    },
    onError: (error) => {
      throw error;
    },
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { add, isPending, isError, error };
};
