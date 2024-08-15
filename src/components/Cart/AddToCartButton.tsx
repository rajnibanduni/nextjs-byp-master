"use client";
import { Ellipsis, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";
import { addOrUpdateItem } from "@/actions/CartAction";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useGetCart } from "@/hooks/useCartSession";

export default function AddToCartButton({
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
  const { data: cart, error } = useGetCart();

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
    <Button
      className={cn(
        "flex px-4 py-3 items-center bg-success hover:bg-successDark cursor-pointer lg:w-[150px] rounded-xl space-x-2",
        className,
        isLoading && "cursor-not-allowed disabled:opacity-60 hover:opacity-60"
      )}
      disabled={isLoading}
      onClick={handleAddToCart}
    >
      {isLoading ? (
        <Ellipsis className="animate-pulse" />
      ) : (
        <Plus
          size={size}
          strokeWidth={strokeWidth}
          className="text-white cursor-pointer"
        />
      )}

      <Label className="text-white cursor-pointer font-bold">Add to cart</Label>
    </Button>
  );
}
