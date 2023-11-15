import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColorPayload, validateColorPayload } from "../validators/color";
import { SortType } from "@/types/types";

export const useGetColors = (page: number, sort: SortType) => {
  const { data, isError, refetch, isLoading } = useQuery({
    queryKey: ["colors"],
    queryFn: async () => {
      const response = await fetch(`/api/color?page=${page}&sort=${sort}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });
  const colors = data?.colors;
  const count = data?.count;

  return { colors, count, isError, refetch, isLoading };
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

type Payload = {
  name: string;
  id: string;
};
export const useUpdateColor = () => {
  const queryClient = useQueryClient();
  const { mutate: updateColor, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
      await fetch("/api/color", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["colors"] });
    },
  });

  return { updateColor, isPending };
};
