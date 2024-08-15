"use server";
import { extApi } from "@/lib/api";
import { ProductFilterValidator } from "@/lib/validators/product-filter-validator";
import { Product } from "@/types/product";

type queryParams = {
  q?: string;
  sort?: string;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string[];
  status?: string[];
  condition?: string[];
  make?: string;
  featured?: boolean;
  model?: string;
  subModel?: string;
  year?: number;
};

interface ProductsResponse {
  totalCount: number;
  products: Product[];
  error: string;
}

export const getAllProducts = async (
  params?: queryParams
): Promise<ProductsResponse> => {
  // products?limit=90&condition=new,used&brand=bmw,kia&year=2014

  const minPrice = params?.minPrice || 0;
  const maxPrice = params?.maxPrice || Infinity;
  const sort = (params?.sort as string) || "none";
  const limit = Number(params?.limit) || 50;

  const brand = params?.brand || "";
  const status = params?.status || "";
  const condition = params?.condition || "";
  const featured = params?.featured ? true : false;

  try {
    const validatedData = ProductFilterValidator.parse({
      sort,
      limit,
      minPrice,
      maxPrice,
      brand,
      status,
      condition,
      featured,
      q: params?.q || "",
      make: params?.make || "",
      model: params?.model || "",
      subModel: params?.subModel || "",
      year: params?.year || 0,
    });

    const queryString = new URLSearchParams(validatedData as any).toString();

    const { data } = await extApi.get<ProductsResponse>(
      `/products?${queryString}`
    );

    return {
      products: data.products,
      totalCount: data.totalCount,
      error: "",
    };
  } catch (error) {
    // TODO: return sentry error
    console.error(error);
    return { products: [], totalCount: 0, error: "Unable to get products" };
  }
};

export const getProductBySlug = async (
  slug: string
): Promise<{ product: Product | null; error: string }> => {
  try {
    const { data } = await extApi.get<Product | null>(`/products/${slug}`);
    return { product: data, error: "" };
  } catch (error) {
    console.error(error);
    return { product: null, error: "Unable to get products" };
  }
};
