import { Product } from "@/types/product";
import Link from "next/link";
import { formatPrice, trimString } from "@/lib/utils";
import ReviewStar from "../ReviewStar";
import { Package } from "lucide-react";
import ProductSlider from "./ProductSlider";
import AddToCartSmall from "../Cart/AddToCartSmall";

export default async function ProductCard({
  product: p,
}: {
  product: Product;
}) {
  if (!p) return;

  return (
    <>
      <div className="w-full lg:px-1">
        <Link href={"/product/" + p.productSlug}>
          <ProductSlider images={p.productImages} />

          <h5 className="text-[0.87rem] my-3 font-semibold transition hover:text-red-600 text-clip overflow-hidden leading-4">
            {trimString(p.productTitle, 45)}
          </h5>
        </Link>
        {/* Review */}
        <div className="lg:flex md:flex grid items-center">
          <ReviewStar rating={2} height={28} />
          <span className="font-semibold text-sm">{1} Review</span>
        </div>

        <div className="flex">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-gray-400 font-light">
              <s>{formatPrice(p.regularPrice)}</s>
            </span>
            <span className="text-primary font-semibold text-xl">
              {formatPrice(p.salePrice)}
            </span>
          </div>
          {/* Cart Icon Button */}
          <AddToCartSmall
            className="ml-auto"
            strokeWidth={1.2}
            size={30}
            product={p}
          />
        </div>
        {/* Stock */}
        <div className="flex items-center mt-3">
          <Package size={17} strokeWidth={1} className="text-successDark" />
          <span className="font-semibold text-xs ml-2 text-successDark">
            In Stock
          </span>
        </div>
      </div>
    </>
  );
}
