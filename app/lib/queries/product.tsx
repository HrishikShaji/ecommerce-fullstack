import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductPayload, validateProductPayload } from "../validators/Product";

export const useGetProducts = () => {
  const {
    data: products,
    isError,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`/api/product`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  return { products, isError, refetch, isLoading };
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: async (payload: ProductPayload) => {
      const isValidPayload = validateProductPayload(payload);
      console.log(isValidPayload);
      const response = await fetch("/api/product", {
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
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { addProduct, isPending };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/product?id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: () => {
      return <div>Error deleting Product</div>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

  return { deleteProduct, isDeleting };
};

type Payload = {
  name: string;
  id: string;
};
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: async (payload: Payload) => {
      await fetch("/api/product", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { updateProduct, isPending };
};
