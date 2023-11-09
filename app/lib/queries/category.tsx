import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CategoryPayload,
  validateCategoryPayload,
} from "../validators/category";

export const useGetCategories = () => {
  const {
    data: categories,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  return { categories, isError, refetch, isLoading };
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: addCategory, isPending } = useMutation({
    mutationFn: async (payload: CategoryPayload) => {
      const isValidPayload = validateCategoryPayload(payload);

      const response = await fetch("/api/category", {
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
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { addCategory, isPending };
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/category?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  return { deleteCategory, isDeleting };
};

type Payload = {
  name: string;
  id: string;
};
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCategory, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
      await fetch("/api/category", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return { updateCategory, isPending };
};
