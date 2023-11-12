import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SizePayload, validateSizePayload } from "../validators/size";

export const useGetSizes = (page: number) => {
  const { data, isError, refetch, isLoading } = useQuery({
    queryKey: ["sizes"],
    queryFn: async () => {
      const response = await fetch(`/api/size?page=${page}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });
  const sizes = data?.sizes;
  const count = data?.count;

  return { sizes, count, isError, refetch, isLoading };
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

type Payload = {
  name: string;
  id: string;
};
export const useUpdateSize = () => {
  const queryClient = useQueryClient();
  const { mutate: updateSize, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
      await fetch("/api/size", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });

  return { updateSize, isPending };
};
