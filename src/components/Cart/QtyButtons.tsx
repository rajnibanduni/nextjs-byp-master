"use client";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { addOrUpdateItem, removeItem } from "@/actions/CartAction";
import { Cart } from "@/types/cartProduct";
import LoadingDots from "../LoadingDots";

type props = {
  productId: string;
  maxQty: number;
  cart: Cart;
};

export default function QtyButtons({ productId, maxQty, cart }: props) {
  const [quantity, setQuantity] = useState(cart?.items[productId].qty);
  const [isDecLoading, setDecIsLoading] = useState(false);
  const [isIncLoading, setIncIsLoading] = useState(false);

  const handleIncQty = async () => {
    setIncIsLoading(true);
    const newQuantity = quantity + 1;
    await addOrUpdateItem(productId, newQuantity);
    setQuantity(newQuantity);
    setIncIsLoading(false);
  };
  const handleDecQty = async () => {
    setDecIsLoading(true);
    if (quantity === 1) {
      await removeItem(productId);
    } else {
      const newQuantity = quantity - 1;
      await addOrUpdateItem(productId, newQuantity);
      setQuantity(newQuantity);
    }
    setDecIsLoading(false);
  };

  const isDisabled = quantity === maxQty;

  return (
    <>
      <div className="flex gap-2 items-center border border-zinc-400 rounded-xl justify-between max-w-24">
        <button
          onClick={handleDecQty}
          className="p-1 h-8 w-full flex items-center"
        >
          {isDecLoading ? (
            <LoadingDots />
          ) : (
            <Minus size={20} strokeWidth={1.5} />
          )}
        </button>
        <p className="text-sm font-semibold">{quantity}</p>

        <button
          onClick={handleIncQty}
          disabled={isDisabled}
          className="p-1 h-8 w-full flex items-center"
        >
          {isIncLoading ? (
            <LoadingDots />
          ) : (
            <Plus
              size={20}
              strokeWidth={1.5}
              className={isDisabled ? "text-gray-400" : ""}
            />
          )}
        </button>
      </div>
    </>
  );
}
