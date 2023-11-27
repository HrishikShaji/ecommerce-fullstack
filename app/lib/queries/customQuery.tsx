import {
  AddQueryProps,
  DeleteQueryProps,
  GetQueryProps,
  UpdateBillboardPayload,
  UpdatePayload,
  UpdateQueryProps,
} from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PayloadType } from "../utils";

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

export const useAddQuery = ({
  validator,
  endpoint,
  queryKey,
  reset,
}: AddQueryProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: add,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload: PayloadType) => {
      const isValidPayload = validator(payload);
      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isValidPayload),
      });
      if (!response.ok) {
        console.log(response);
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

export const useUpdateQuery = ({
  endpoint,
  queryKey,
  validator,
}: UpdateQueryProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: update,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload: UpdateBillboardPayload) => {
      const isValidPayload = validator(payload);
      await fetch(`/api/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isValidPayload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { update, isPending, isError, error };
};
