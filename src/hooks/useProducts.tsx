import { getAllProducts, getProductBySlug } from "@/actions/ProductsAction";
import { useQuery } from "@tanstack/react-query";

type params = {
  limit?: number;
  filter?: string;
};

export const useGetAllProducts = ({ limit, filter }: params) => {
  return useQuery({
    queryKey: ["get-all"],
    queryFn: () => getAllProducts({ limit }),
  });
};

export const useGetProductBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["get-product", slug],
    queryFn: () => getProductBySlug(slug),
  });
};
