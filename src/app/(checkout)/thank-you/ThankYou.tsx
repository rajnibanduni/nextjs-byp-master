"use client";

import { getPaymentStatus } from "@/actions/PaymentAction";
import { useQuery } from "@tanstack/react-query";
import { CircleChevronLeft, Loader2, PackageX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Order } from "@/types/order";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import moment from "moment";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function ThankYou() {
  const orderId = useSearchParams().get("orderId") || "";

  const [refetchInterval, setRefetchInterval] = useState<number>();
  const [fetchingError, setFetchingError] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["get-payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    // retryDelay: 500,
    refetchIntervalInBackground: true,
    refetchInterval: refetchInterval,
  });

  useEffect(() => {
    if (data === false) {
      setRefetchInterval(3 * 1000);
    }

    const timer = setTimeout(() => {
      setRefetchInterval(undefined); // Stop refetching after 2 minutes
      if (data === false) setFetchingError(true);
    }, 1 * 60 * 1000); // 2 minutes in milliseconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [data]);

  const order = data as Order;

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          <p>This won&apos;t take long.</p>
        </div>
      </div>
    );
  }

  if (data.errorCode === 404 || fetchingError === true) {
    return (
      <div className="w-full mt-36 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <PackageX className="h-16 w-16 text-primary" />
          <h3 className="font-semibold text-xl">
            Oops! Something went wrong while getting order.
          </h3>
          <p>
            Go to the
            <Link
              href={"/account/orders"}
              className="hover:underline text-primary"
            >
              &nbsp;orders&nbsp;
            </Link>
            page.
          </p>

          <div className="w-28 flex items-center justify-center gap-x-3">
            <Separator />
            <span>Or</span>
            <Separator />
          </div>

          <p>
            Please contact our
            <Link
              href={"/help-center"}
              className="hover:underline text-primary"
            >
              &nbsp;support&nbsp;
            </Link>
            if you need any help.
          </p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );
  }

  const {
    billingAddress,
    shippingAddress,
    paymentMethod,
    orderItems,
    paymentResponse,
    taxPrice,
    totalPrice,
    totalQty,
    totalShippingPrice,
    createdAt,
  } = order;

  const subTotal = totalPrice - totalShippingPrice - taxPrice;

  return (
    <MaxWidthWrapper className="max-w-3xl mb-10">
      <div className="bg-white mt-5">
        <p className="text-lg font-bold text-primary">
          Thank you for your order!
        </p>
        <h1 className="mt-2 lg:text-4xl font-bold tracking-tight text-4xl text-zinc-700">
          Your order has been successfully placed!
        </h1>
        <p className="mt-2 text-base text-zinc-500">
          We&apos;ve received your order. It will be delivered to you within 2-3
          business days.
        </p>

        <div>
          <Link
            href={"/account/orders"}
            className="flex items-center space-x-2 mt-5 text-success hover:underline"
          >
            <CircleChevronLeft />
            <span className="font-semibold">return to orders</span>
          </Link>
        </div>

        <div className="flex items-center justify-between max-w-xl mt-10">
          <div className="text-sm font-medium">
            <p className="text-zinc-900">Order #</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
          <div className="text-sm font-medium">
            <p className="text-zinc-900">Order Date</p>
            <p className="mt-2 text-zinc-500">
              {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
          <div className="text-sm font-medium">
            <p className="text-zinc-900">Order Total</p>
            <p className="mt-2 text-zinc-500">{formatPrice(totalPrice)}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              Thank you for choosing our store for your automobile spare parts
              and accessories needs. We appreciate your business and are excited
              to help you get your vehicle back on the road in top condition.
            </p>
          </div>
        </div>

        {/* Order Details */}
        <h3 className="mt-10 text-lg ml-1 mb-3 font-semibold">
          Order Details:
        </h3>

        <div className="border p-5 rounded-xl max-w-2xl bg-zinc-100/50">
          <table className="w-full">
            <tr className="text-left border-b border-dashed">
              <th>Product</th>
              <th>Total</th>
            </tr>

            {Object.entries(orderItems).map(([key, item]) => (
              <tr key={key} className="border-b border-dashed h-8">
                <td>
                  <h4 className="text-xs">
                    {item.product.productTitle} x <b>{item.qty}</b>
                  </h4>
                </td>
                <td>
                  <h4 className="text-xs " key={key}>
                    {formatPrice(item.subTotal)}
                  </h4>
                </td>
              </tr>
            ))}

            <div className="my-2"></div>

            <tr>
              <td>
                <h4 className="text-xs">Subtotal:</h4>
              </td>
              <td>
                <b className="text-xs">{formatPrice(subTotal)}</b>
              </td>
            </tr>

            <tr>
              <td>
                <h4 className="text-xs">Shipping:</h4>
              </td>
              <td>
                <b className="text-xs">{formatPrice(totalShippingPrice)}</b>
              </td>
            </tr>

            <tr>
              <td>
                <h4 className="text-xs">Tax:</h4>
              </td>
              <td>
                <b className="text-xs">{formatPrice(taxPrice)}</b>
              </td>
            </tr>

            <tr className="border-t border-dotted">
              <td>
                <b className="text-xs">Total:</b>
              </td>
              <td>
                <b className="text-xs">{formatPrice(totalPrice)}</b>
              </td>
            </tr>
          </table>
        </div>

        {/* Billing/Shipping */}
        <div className="p-1">
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shipping Address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">
                    {shippingAddress.firstName}&nbsp;
                    {shippingAddress.lastName}
                  </span>
                  <span className="block">{shippingAddress.streetAddress}</span>
                  <span className="block">
                    {shippingAddress.city},&nbsp;{shippingAddress.state}&nbsp;
                    {shippingAddress.zipCode}
                  </span>

                  <span className="block">{shippingAddress.country}</span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Billing Address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">
                    {billingAddress.firstName}&nbsp;{billingAddress.lastName}
                  </span>
                  <span className="block">{billingAddress.streetAddress}</span>
                  <span className="block">
                    {billingAddress.city},&nbsp;{billingAddress.state}&nbsp;
                    {billingAddress.zipCode}
                  </span>

                  <span className="block">{billingAddress.country}</span>
                </address>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment Status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Payment Method</p>
              <p className="mt-2 text-zinc-700">
                {paymentMethod === "STRIPE" ? "Card" : paymentMethod}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
