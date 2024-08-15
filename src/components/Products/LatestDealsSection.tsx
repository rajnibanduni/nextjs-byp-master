import Link from "next/link";
import { Separator } from "../ui/separator";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import ProductHoverInfoCard from "./ProductHoverInfoCard";
import { Product } from "@/types/product";
import { getAllProducts } from "@/actions/ProductsAction";

export default async function LatestDealsSection() {
  // const {
  //   data: products,
  //   error,
  //   isPending,
  // } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: async () => await getAllProducts({ limit: 40 }),
  //   staleTime: 5 * 60 * 10,
  // });

  const { products, error, totalCount } = await getAllProducts({
    limit: 5,
    sort: "price-asc",
  });

  if (!products) {
    return <div>Unable to get products. </div>;
  }
  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <h3 className="text-primary text-lg font-semibold">
          Latest Deals of this Week
        </h3>
        <Link
          href="#"
          className="flex items-center ml-auto text-sm hover:text-red-500 font-medium"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Separator className="bg-primary my-3" />
      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {/* {isPending && <div>Loading...</div>} */}

        {products &&
          products.map((product: Product) => (
            <ProductHoverInfoCard product={product} key={product.productId} />
          ))}
      </div>
    </section>
  );
}
