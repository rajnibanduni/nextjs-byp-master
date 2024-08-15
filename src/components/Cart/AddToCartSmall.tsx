"use client";
import { LoaderCircle, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { addOrUpdateItem } from "@/actions/CartAction";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AddToCartSmall({
  className,
  size = 23,
  strokeWidth = 1,
  product,
}: {
  className?: string;
  size?: number;
  strokeWidth?: number;
  product: Product;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await addOrUpdateItem(product.productId);
    toast.success(`"${product.productTitle}" has been added to your cart!`, {
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
    setIsLoading(false);
  };

  return (
    <>
      <button
        className={cn(
          "w-10 h-10 cursor-pointer rounded-xl bg-gray-200 hover:bg-primary group",
          className
        )}
        disabled={isLoading}
        onClick={handleAddToCart}
      >
        {isLoading ? (
          <LoaderCircle
            className="animate-spin duration-500 text-zinc-800 group-hover:text-white m-auto p-[2px]"
            size={size}
            strokeWidth={strokeWidth}
          />
        ) : (
          <ShoppingCart
            size={size}
            strokeWidth={strokeWidth}
            className="text-zinc-800 group-hover:text-white m-auto p-[2px]"
          />
        )}
      </button>
    </>
  );
}
