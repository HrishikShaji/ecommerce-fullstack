import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BillboardPayload } from "../validators/Billboard";
import { SortType } from "@/types/types";
import { ProductPayload } from "../validators/Product";
import { CategoryPayload } from "../validators/category";
import { SizePayload } from "../validators/size";
import { ColorPayload } from "../validators/color";

export type QueryKey =
  | "billboards"
  | "products"
  | "categories"
  | "search"
  | "sizes"
  | "colors";

export type GetQueryProps = {
  page: number;
  sort: SortType;
  endpoint: string;
  queryKey: QueryKey;
};

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

export type AddPayload =
  | BillboardPayload
  | ProductPayload
  | CategoryPayload
  | SizePayload
  | ColorPayload;

export type Validator = (inputs: AddPayload) => AddPayload;

export type AddQueryProps = {
  validator: Validator;
  endpoint: string;
  queryKey: QueryKey;
};

export const useAddQuery = ({
  validator,
  endpoint,
  queryKey,
}: AddQueryProps) => {
  const queryClient = useQueryClient();
  const {
    mutate: add,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (payload: AddPayload) => {
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
    },
    onError: () => {
      return <div>{`Error adding ${endpoint}`}</div>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return { add, isPending, isError };
};

export const useDeleteQuery = ({
  endpoint,
  queryKey,
}: {
  endpoint: string;
  queryKey: QueryKey;
}) => {
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

export type Payload = {
  name: string;
  id: string;
};

export const useUpdateQuery = ({
  endpoint,
  queryKey,
}: {
  endpoint: string;
  queryKey: QueryKey;
}) => {
  const queryClient = useQueryClient();
  const { mutate: update, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
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
