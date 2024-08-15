"use client";

import { removeItem } from "@/actions/CartAction";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useState } from "react";

export default function RemoveCartItemButton({
  className,
  productId,
}: {
  className?: string;
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveItem = async () => {
    setIsLoading(true);
    await removeItem(productId);
    setIsLoading(false);
  };
  return (
    <button
      className={cn(
        `absolute -top-1 -left-3 bg-red-600 rounded-full text-white`,
        className
      )}
      onClick={handleRemoveItem}
      disabled={isLoading}
    >
      <X size={20} />
    </button>
  );
}
