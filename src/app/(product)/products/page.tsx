import { getAllProducts } from "@/actions/ProductsAction";
import MobileSidebarFilters from "@/components/Filters/MobileSidebarFilters";
import ProductsHeaderFilter from "@/components/Filters/ProductsHeaderFilter";
import EmptyState from "@/components/Products/EmptyState";
import ProductHoverInfoCard from "@/components/Products/ProductHoverInfoCard";
import { Product } from "@/types/product";
import { notFound } from "next/navigation";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | Array<string> | number | undefined };
}) {
  const minPrice = Number(searchParams?.minPrice);
  const maxPrice = Number(searchParams?.maxPrice);
  const q = searchParams?.q as string;
  const sort = searchParams?.sort as string;
  const limit = (searchParams?.perPage as number) || 16;
  const brand = searchParams?.brand as Array<string>;
  const status = searchParams?.status as Array<string>;
  const condition = searchParams?.condition as Array<string>;
  const featured = searchParams?.featured === "true" || undefined;

  const query = {
    q,
    sort,
    limit,
    minPrice,
    maxPrice,
    brand,
    status,
    condition,
    featured,
  };
  const { products, totalCount, error } = await getAllProducts(query);

  if (!products || error) return <EmptyState />;

  return (
    <>
      {/* Filters */}
      <div className="hidden lg:block md:block mb-7">
        <div className="bg-gray-200/75 p-5 flex items-center justify-between rounded-lg">
          <div>
            <p className="text-sm font-light">
              {totalCount <= limit
                ? `Showing all ${totalCount} results`
                : `Showing 1-${limit} of ${totalCount} results`}
            </p>
          </div>
          <ProductsHeaderFilter />
        </div>
      </div>
      {/* Mobile Filters */}
      <div className="block lg:hidden md:hidden mb-7">
        <div className="bg-gray-200/75 p-3 flex items-center justify-between rounded-lg">
          <MobileSidebarFilters />
          <div className="flex items-center gap-x-2">
            <ProductsHeaderFilter />
          </div>
        </div>
      </div>
      {products && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-2">
          {products?.map((product: Product) => (
            <ProductHoverInfoCard product={product} key={product.productId} />
          ))}
        </div>
      )}
    </>
  );
}
