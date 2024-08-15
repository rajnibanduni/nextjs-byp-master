import Banner from "../Banner";
import ProductHoverInfoCard from "./ProductHoverInfoCard";
import { Product } from "@/types/product";
import Link from "next/link";
import { getAllProducts } from "@/actions/ProductsAction";
import { XCircle } from "lucide-react";

/**
+ * Renders the ProductsShowcase component, which displays a section of products with a banner and a grid of product cards.
+ *
+ * @return {JSX.Element} The JSX element representing the ProductsShowcase component.
+ */
export default async function ProductsShowcase() {
  const { products, error } = await getAllProducts({ limit: 8 });

  if (!products || error) {
    return (
      <section className="flex flex-col lg:flex-row items-center my-5 space-y-10 lg:space-y-0">
        <div className="h-full text-white w-full lg:max-w-[350px]">
          <Banner
            imgUrl="/images/banner-04.jpg"
            className="rounded-lg lg:rounded-r-none lg:h-[752px]"
          >
            <div className="p-7 space-y-5">
              <h5 className="text-7xl text-center">-35%</h5>
              <p className="text-sm font-semibold">Only this week</p>
              <h3 className="text-xl">Tools & Equipment</h3>
              <p className="text-xs text-muted-foreground mb-5">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dignissimos iusto incidunt accusamus tempore suscipit a dicta
                nam enim mollitia minima!
              </p>
              <Link href="#" className="text-sm">
                Shop Now &rarr;
              </Link>
            </div>
          </Banner>
        </div>
        {/* Products */}
        <div className="m-auto">
          <div className="relative mt-5 col-span-full  w-full  flex flex-col items-center justify-center">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="font-semibold text-xl">No products found.</h3>
            <p className="text-zinc-500 text-sm">Unable to find products.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="flex flex-col lg:flex-row items-center my-5 space-y-10 lg:space-y-0">
      <div className="h-full text-white w-full lg:max-w-[350px]">
        <Banner
          imgUrl="/images/banner-04.jpg"
          className="rounded-lg lg:rounded-r-none lg:h-[752px]"
        >
          <div className="p-7 space-y-5">
            <h5 className="text-7xl text-center">-35%</h5>
            <p className="text-sm font-semibold">Only this week</p>
            <h3 className="text-xl">Tools & Equipment</h3>
            <p className="text-xs text-muted-foreground mb-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Dignissimos iusto incidunt accusamus tempore suscipit a dicta nam
              enim mollitia minima!
            </p>
            <Link href="#" className="text-sm">
              Shop Now &rarr;
            </Link>
          </div>
        </Banner>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-[2px] rounded-lg lg:rounded-l-none w-full lg:h-[753px]">
        {products.map((product: Product) => (
          <ProductHoverInfoCard product={product} key={product.productId} />
        ))}
      </div>
    </section>
  );
}
