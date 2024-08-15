import { Product } from "@/types/product";
import Link from "next/link";
import ProductSlider from "./ProductSlider";
import { formatPrice, trimString } from "@/lib/utils";
import ReviewStar from "../ReviewStar";
import { Package } from "lucide-react";
import AddToCartButton from "../Cart/AddToCartButton";
import { useStore } from "@/store/store";
import QtyButtons from "../Cart/QtyButtons";

export default function ProductHoverInfoCard({
  product: p,
}: {
  product: Product;
}) {
  return (
    // max-w-[400px] md:max-w-[170px] lg:max-w-[230px]
    <div className="relative group ">
      <div className="p-2 space-y-2 rounded-t-xl lg:group-hover:border bg-white">
        <Link href={"/product/" + p.productSlug}>
          <ProductSlider images={p.productImages} />

          <h5 className="text-[0.87rem] my-3 font-semibold transition hover:text-red-600 text-clip overflow-hidden leading-4">
            {trimString(p.productTitle, 45)}
          </h5>
        </Link>
        {/* Review */}
        <div className="inline-block">
          <ReviewStar rating={5} height={20} fontsize={19} />
          <span className="text-xs font-semibold ml-1">1 Review</span>
        </div>

        {/* Price */}
        <div className="flex space-x-2">
          <span className="text-gray-400 font-light">
            <s>{formatPrice(p.regularPrice)}</s>
          </span>
          <span className="text-primary font-semibold text-xl">
            {formatPrice(p.salePrice)}
          </span>
        </div>

        {/* Stock */}
        <div className="flex items-center mt-3">
          <Package size={17} strokeWidth={1} className="text-successDark" />
          <span className="font-semibold text-xs ml-2 text-successDark">
            In Stock
          </span>
        </div>

        {/* Add to cart button for mobile */}

        <AddToCartButton
          className="bg-primary !w-full lg:hidden p-2"
          size={25}
          strokeWidth={1.5}
          product={p}
        />

        {/* Hover Area */}
        <div className="absolute bg-white z-50 hidden lg:group-hover:block rounded-b-lg shadow-2xl border left-0 p-2 w-full">
          {/* Short description */}
          <div className="text-xs my-3 px-3">
            {p.shortDescription}
            <ul className="space-y-1">
              <li className="list-disc">
                Best-in-class all-around performance
              </li>
              <li className="list-disc">
                Confident driving in all weather conditions
              </li>
              <li className="list-disc">Visual Alignment Indicators</li>
            </ul>
          </div>

          <AddToCartButton className="bg-primary !w-full" product={p} />
        </div>
      </div>
    </div>
  );
}
