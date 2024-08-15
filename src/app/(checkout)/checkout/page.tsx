import { createCheckoutSession } from "@/actions/CheckoutAction";
import CheckoutForm from "@/components/Forms/CheckoutForm";
// import CheckoutForm from "./_components/CheckoutForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import StripePaymentElement from "@/components/Stripe/PaymentElement";
import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const result = await createCheckoutSession();

  if (result.error || !result.cart) redirect("/cart");

  return (
    <MaxWidthWrapper>
      <StripePaymentElement clientSecret={result.clientSecret}>
        {/* <CheckoutForm
            sessionId={result.sessionId}
            cart={result.cart}
            paymentId={result.paymentId}
          /> */}
        <CheckoutForm cart={result.cart} sessionId={result.sessionId} />
      </StripePaymentElement>
    </MaxWidthWrapper>
  );
}
