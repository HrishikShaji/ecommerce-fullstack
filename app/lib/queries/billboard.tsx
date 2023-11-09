import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../validators/Billboard";

export const useGetBillboards = () => {
  const {
    data: billboards,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["billboards"],
    queryFn: async () => {
      const response = await fetch(`/api/billboard`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  return { billboards, isError, refetch, isLoading };
};

export const useAddBillboard = () => {
  const queryClient = useQueryClient();
  const { mutate: addBillboard, isPending } = useMutation({
    mutationFn: async (payload: BillboardPayload) => {
      const isValidPayload = validateBillboardPayload(payload);

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

  return { addBillboard, isPending };
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