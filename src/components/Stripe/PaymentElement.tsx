"use client";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/load-stripe";
import { ReactNode } from "react";

export default function StripePaymentElement({
  clientSecret,
  children,
}: {
  clientSecret?: string;
  children: ReactNode;
}) {
  const stripe = getStripe();

  return (
    <div>
      {stripe && (
        <Elements
          stripe={stripe}
          options={{
            clientSecret: clientSecret,
            // mode: "payment",
            // amount: totalAmount,
            // currency: "usd",
            // appearance: {},
          }}
        >
          {children}
        </Elements>
      )}
    </div>
  );
}
