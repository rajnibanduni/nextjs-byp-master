import { type Cart } from "@/types/cartProduct";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import CouponCodeForm from "../Forms/CouponCodeForm";
import Image from "next/image";
import { cn, formatPrice, trimString } from "@/lib/utils";
import QtyButtons from "./QtyButtons";
import { Separator } from "../ui/separator";
import RemoveCartItemButton from "./RemoveCartItemButton";
import CheckoutButton from "./CheckoutButton";

export default function Cart({ cart }: { cart: Cart | undefined }) {
  const itemsCount = cart?.totalQty ? cart.totalQty : 0;

  if (itemsCount === 0) {
    return (
      <section className="flex h-full my-24 lg:my-32 flex-col items-center justify-center space-y-1">
        <div
          className="relative mb-4 space-y-2 text-muted-foreground"
          aria-hidden="true"
        >
          <ShoppingCart
            className="mx-auto text-gray-400 !pointer-events-auto"
            size={150}
          />
          <p className="text-xl text-center text-gray-400 font-semibold">
            Your cart is currently empty.
          </p>
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
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col lg:flex-row h-full items-start my-14 justify-between lg:space-x-5 space-y-5">
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] lg:w-[100px] px-0 font-semibold text-zinc-400"></TableHead>
              <TableHead className="w-[350px] lg:w-[300px] px-0 font-semibold text-zinc-400">
                Product
              </TableHead>
              <TableHead className="hidden lg:flex md:flex items-center font-semibold text-zinc-400">
                Price
              </TableHead>
              <TableHead className="font-semibold text-zinc-400">
                Quantity
              </TableHead>
              <TableHead className="hidden lg:flex md:flex items-center font-semibold text-zinc-400">
                Subtotal
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart &&
              Object.entries(cart.items).map(([key, item]) => (
                <TableRow key={key}>
                  <TableCell className="p-3 lg:p-4 md:p-4">
                    <div className="relative z-25">
                      <RemoveCartItemButton
                        productId={item.product.productId}
                      />
                      <div className="border rounded-lg max-w-[4.375rem]">
                        <Image
                          src={item.product.productImages[0].url}
                          alt={item.product.productTitle}
                          height={300}
                          width={300}
                          className="object-cover rounded-lg max-w-full"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-0 lg:p-4 md:p-4">
                    <h3 className="text-xs lg:text-sm md:text-sm leading-relaxed">
                      <Link
                        href={`/product/${item.product.productSlug}`}
                        className="hover:underline"
                      >
                        {trimString(item.product.productTitle, 60)}
                      </Link>
                    </h3>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell md:table-cell">
                    <h3 className="font-semibold">
                      {formatPrice(item.product.salePrice)}
                    </h3>
                  </TableCell>
                  <TableCell className="p-0 px-1 lg:p-4 md:p-4">
                    <QtyButtons
                      productId={item.product.productId}
                      maxQty={item.product.productStock}
                      cart={cart}
                    />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell md:table-cell">
                    <h3 className="font-semibold">
                      {formatPrice(item.product.salePrice * item.qty)}
                    </h3>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>
                <div className="my-5 lg:max-w-sm">
                  <CouponCodeForm />
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="w-full lg:w-[420px]">
        <Card className="w-full p-2">
          <CardHeader className="p-2">
            <CardTitle className="text-[15px] font-bold uppercase">
              Order Summary
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="flex justify-between items-center text-sm space-y-1.5">
            {/* Add Subtotal and other calculations here */}
            <h3>Item(s) Subtotal</h3>
            <h3>{cart && formatPrice(cart?.subTotal)}</h3>
          </CardContent>
          <Separator />
          <CardContent>
            <div className="flex justify-between items-start text-sm">
              <h3>Shipping</h3>
              <div className="flex flex-col text-right">
                <h3>{cart && formatPrice(cart?.totalShippingPrice)}</h3>
                <h3>
                  Shipping to: <b>{cart?.stateCode}</b>
                </h3>
              </div>
              {/* <p>Taxes and Shipping calculated at checkout</p> */}
            </div>
          </CardContent>
          <Separator />
          <CardContent className="flex justify-between">
            <h3>Sub Total</h3>
            <h3 className="font-bold">{cart && formatPrice(cart?.subTotal)}</h3>
          </CardContent>
          <Separator />
          <CardContent>
            <CheckoutButton />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
