import { z } from "zod";

export const AVAILABLE_SORT = [
  "none",
  "asc",
  "desc",
  "price-asc",
  "price-desc",
  "popular",
] as const;

// export const AVAILABLE_STATUS = ["inStock", "onSale","outOfStock"] as const;
// export const AVAILABLE_CONDITION = ["new", "used"] as const;

export const ProductFilterValidator = z.object({
  q: z.string().optional(),
  sort: z.enum(AVAILABLE_SORT).optional(),
  limit: z.number().int(),
  page: z.number().int().optional(),
  // price: z.tuple([z.number(), z.number()]),
  featured: z.boolean().optional(),
  minPrice: z.number(),
  maxPrice: z.number(),
  brand: z.string().optional(),
  // status: z.array(z.enum(AVAILABLE_STATUS)).optional(),
  status: z.string().optional(),
  // condition: z.array(z.enum(AVAILABLE_CONDITION)).optional(),
  condition: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  subModel: z.string().optional(),
  year: z.number().optional(),
});

export type ProductState = Omit<
  z.infer<typeof ProductFilterValidator>,
  "price"
> & { price: { isCustom: boolean; range: [number, number] } };
