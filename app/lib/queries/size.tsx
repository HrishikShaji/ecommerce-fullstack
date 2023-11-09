import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SizePayload, validateSizePayload } from "../validators/size";

export const useGetSizes = () => {
  const {
    data: sizes,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sizes"],
    queryFn: async () => {
      const response = await fetch(`/api/size`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  return { sizes, isError, refetch, isLoading };
};

export const useAddSize = () => {
  const queryClient = useQueryClient();
  const { mutate: addSize, isPending } = useMutation({
    mutationFn: async (payload: SizePayload) => {
      const isValidPayload = validateSizePayload(payload);

      const response = await fetch("/api/size", {
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
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });

  return { addSize, isPending };
};

export const useDeleteSize = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteSize, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/size?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sizes"] }),
  });

  return { deleteSize, isDeleting };
};