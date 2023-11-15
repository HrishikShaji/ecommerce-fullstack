import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../validators/Billboard";
import { SortType } from "@/types/types";

export const useGetBillboards = (page: number, sort: SortType) => {
  const {
    data: response,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["billboards"],
    queryFn: async () => {
      const response = await fetch(`/api/billboard?page=${page}&sort=${sort}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  const data = response?.billboards;
  const count = response?.count;
  return { count, data, isError, refetch, isLoading };
};

export const useAddBillboard = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: BillboardPayload) => {
      console.log(payload);
      const isValidPayload = validateBillboardPayload(payload);
      console.log(isValidPayload);
      const response = await fetch("/api/billboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isValidPayload),
      });
      return response;
    },
    onError: () => {
      return <div>Error adding Billboard</div>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billboards"] });
    },
  });

  return { mutate, isPending };
};

export const useDeleteBillboard = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBillboard, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/billboard?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["billboards"] }),
  });

  return { deleteBillboard, isDeleting };
};

type Payload = {
  name: string;
  id: string;
};

export const useUpdateBillboard = () => {
  const queryClient = useQueryClient();
  const { mutate: updateBillboard, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
      await fetch("/api/billboard", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billboards"] });
    },
  });

  return { updateBillboard, isPending };
};
