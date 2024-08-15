import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductReel from "./ProductReel";
import { useGetAllProducts } from "@/hooks/useProducts";
import { getAllProducts } from "@/actions/ProductsAction";

export default async function FeaturedProducts() {
  // const {
  //   data: products,
  //   error,
  //   isPending,
  // } = useGetAllProducts({ limit: 10, filter: "featured" });

  // if (error) {
  //   return <div>Unable to get products. {error.message}</div>;
  // }

  const { products } = await getAllProducts({ limit: 10, featured: true });
  return (
    <section className="mt-10">
      {/* For Lg Screens */}
      <Tabs defaultValue="safety">
        <div className="flex items-center">
          <h3 className="text-xl font-medium mr-5">Featured Products</h3>

          <div className="hidden lg:block">
            <TabsList className="flex space-x-5 justify-start  rounded-none m-0 bg-transparent">
              <TabsTrigger
                className="my-auto rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 bg-transparent"
                value="safety"
              >
                Auto Safety & Security
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 bg-transparent"
                value="interior"
              >
                Interior Accessories
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
                value="motor-oil"
              >
                Motor Oils
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none data-[state=active]:border-orange-600 data-[state=active]:border-b-2 !bg-transparent"
                value="tires-wheels"
              >
                Tires & Wheels
              </TabsTrigger>
            </TabsList>
          </div>

          <Link
            href="/products?featured=true"
            className="flex items-center ml-auto text-sm hover:text-red-500 font-medium"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Separator />
        {/* {isPending && <div>Loading...</div>} */}
        <TabsContent value="safety">
          {/* Product Reel */}
          {products && <ProductReel products={products} />}
        </TabsContent>
        <TabsContent value="interior">{/* Product Reel */}</TabsContent>
        <TabsContent value="motor-oil">{/* Product Reel */}</TabsContent>
        <TabsContent value="tires-wheels">{/* Product Reel */}</TabsContent>
      </Tabs>
      {/* For small screens */}
    </section>
  );
}
