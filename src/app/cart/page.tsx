import { getCart } from "@/actions/CartAction";
import Cart from "@/components/Cart/Cart";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default async function CartPage() {
  const cart = await getCart();
  return (
    <MaxWidthWrapper>
      <Cart cart={cart} />
    </MaxWidthWrapper>
  );
}
