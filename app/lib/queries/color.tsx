import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../validators/Billboard";
import { ColorPayload, validateColorPayload } from "../validators/color";

export const useGetColors = () => {
  const {
    data: colors,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const response = await fetch(`/api/color`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  return { colors, isError, refetch, isLoading };
};

export const useAddColors = () => {
  const queryClient = useQueryClient();
  const { mutate: addColor, isPending } = useMutation({
    mutationFn: async (payload: ColorPayload) => {
      const isValidPayload = validateColorPayload(payload);

      const response = await fetch("/api/color", {
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
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
  });

  return { addColor, isPending };
};

export const useDeleteColor = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteColor, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/color?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["colors"] }),
  });

  return { deleteColor, isDeleting };
};
