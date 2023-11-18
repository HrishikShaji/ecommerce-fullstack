import {
  AddQueryProps,
  DeleteQueryProps,
  GetQueryProps,
  UpdatePayload,
  UpdateQueryProps,
} from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useAddQuery = <T,>({
  validator,
  endpoint,
  queryKey,
}: AddQueryProps<T>) => {
  const queryClient = useQueryClient();
  const {
    mutate: add,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (payload: T) => {
      try {
        console.log(payload);
        const isValidPayload = validator(payload);
        const response = await fetch(`/api/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(isValidPayload),
        });
        if (!response.ok) {
          throw new Error("failed");
        }
        return response;
      } catch (error) {
        throw Error("feoh");
      }
    },
    onError: (error) => {
      return <div>{`Error adding ${error.message}`}</div>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { add, isPending, isError };
};

export const useDeleteQuery = ({ endpoint, queryKey }: DeleteQueryProps) => {
  const queryClient = useQueryClient();
  const { mutate: remove, isPending: isDeleting } = useMutation({
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

  return { remove, isDeleting };
};

export const useUpdateQuery = ({ endpoint, queryKey }: UpdateQueryProps) => {
  const queryClient = useQueryClient();
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (payload: UpdatePayload) => {
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

  return { update, isPending };
};
