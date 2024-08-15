import Logo from "../Logo";

export default function CheckoutHeader() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-y-3">
      <Logo height={70} width={70} />

      <div className="flex items-center gap-x-5">
        <div>Cart</div>
        <div>Information</div>
        <div>Finish</div>
      </div>
    </div>
  );
}

{
  /* <div className="flex items-center">
  <Lock size={20} />
  <h2 className="font-extrabold text-xl tracking-tighter font-krub text-gray-800">
    CHECKOUT
  </h2>
</div> */
}
