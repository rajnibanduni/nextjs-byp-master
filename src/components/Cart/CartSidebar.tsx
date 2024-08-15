import Link from "next/link";
import CartIcon from "../icons/Cart";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { formatPrice, trimString } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import QtyButtons from "./QtyButtons";
import { getCart } from "@/actions/CartAction";
import CheckoutButton from "./CheckoutButton";

export default async function CartSidebar() {
  const cart = await getCart();

  const itemsCount = cart?.totalQty ? cart.totalQty : 0;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center gap-x-3 cursor-pointer font-krub">
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-primary text-white px-[5px] py-[0.1px] rounded-full text-xs">
              {itemsCount > 9 ? "9+" : itemsCount}
            </span>
            <ShoppingCart className="h-[24px] w-[24px]" />
          </div>
          <div className="hidden lg:flex flex-col -space-y-1">
            <span className="text-[0.6875rem] text-gray-500">
              {itemsCount} item(s)
            </span>
            <span className="text-[1rem] font-bold">
              {cart
                ? formatPrice(cart.subTotal, { notation: "compact" })
                : formatPrice(0)}
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full lg:w-[450px] md:w-[400px]">
        <SheetHeader>
          <SheetTitle>Cart ({itemsCount})</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full p-0 m-0">
          {itemsCount > 0 ? (
            <>
              {/* FIXME: align gap between items */}
              <div className="flex flex-col pr-6 mt-5">
                {cart &&
                  Object.entries(cart.items).map(([key, item]) => (
                    <div key={key}>
                      <div className="flex items-center space-x-2">
                        {/* Image */}
                        <Image
                          src={item.product.productImages[0].url}
                          alt={item.product.productTitle}
                          height={100}
                          width={100}
                          className="border border-gray-400 rounded-lg overflow-hidden"
                        />
                        <div className="flex flex-col">
                          {/* title */}
                          <h3 className="text-sm font-semibold leading-tight">
                            <SheetTrigger asChild>
                              <Link
                                href={`/product/${item.product.productSlug}`}
                                className="hover:underline"
                              >
                                {trimString(item.product.productTitle, 40)}
                              </Link>
                            </SheetTrigger>
                          </h3>
                          <p className="text-xs">{item.product.productBrand}</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          {/* price */}
                          <h3 className="font-semibold">
                            {formatPrice(item.product.salePrice * item.qty)}
                          </h3>
                          {/* Qty Buttons */}
                          <QtyButtons
                            productId={item.product.productId}
                            maxQty={item.product.productStock}
                            cart={cart}
                          />
                        </div>
                      </div>
                      <Separator className="my-1 lg:my-2 " />
                    </div>
                  ))}
              </div>

              <div className="space-y-4 pr-6">
                <div className="space-y-1.5 text-sm">
                  <div className="flex">
                    <span className="flex-1">Taxes</span>
                    <span>
                      {cart && cart.tax > 0
                        ? formatPrice(cart?.tax)
                        : "Calculated at checkout"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex">
                    <span className="flex-1">Shipping</span>
                    <span>
                      {cart && cart.totalShippingPrice > 0
                        ? formatPrice(cart.totalShippingPrice)
                        : "Calculated at checkout"}
                    </span>
                  </div>

                  <div className="flex font-bold">
                    <span className="flex-1">Sub Total</span>
                    <span>{cart && formatPrice(cart.subTotal)} USD</span>
                  </div>
                </div>

                <SheetFooter>
                  <SheetTrigger asChild>
                    <Link
                      href="/cart"
                      className={buttonVariants({
                        variant: "dark",
                        className: "w-full mb-2",
                      })}
                    >
                      View Cart
                    </Link>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <CheckoutButton />
                  </SheetTrigger>
                </SheetFooter>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  className="realtive mb-4 h-60 w-60 text-muted-foreground"
                  aria-hidden="true"
                >
                  <CartIcon className="mx-auto h-24 w-24 text-gray-400 !pointer-events-auto" />
                  <p className="text-xl text-center text-gray-400 font-semibold">
                    Your cart is empty.
                  </p>
                  <SheetTrigger asChild>
                    <Link
                      href="/products"
                      className={buttonVariants({
                        size: "sm",
                        variant: "link",
                        className: "text-sm text-muted-foreground",
                      })}
                    >
                      Add items to your cart to checkout
                    </Link>
                  </SheetTrigger>
                </div>
              </div>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
