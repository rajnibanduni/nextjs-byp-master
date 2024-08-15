import { addOrUpdateItem, getCart, removeItem } from "@/actions/CartAction";
import { useQuery } from "@tanstack/react-query";

export const useUpdateCartItem = (id: string, qty: number) => {
  return useQuery({
    queryKey: ["add-cart-item"],
    queryFn: () => addOrUpdateItem(id, qty),
  });
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),
    staleTime: 100,
  });
};

export const useDeleteCartItem = (id: string) => {
  return useQuery({
    queryKey: ["delete-cart-item"],
    queryFn: () => removeItem(id),
  });
};
