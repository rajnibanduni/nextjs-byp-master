"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/actions/CheckoutAction";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, checkoutFormType } from "@/types/checkoutSchema";
import CheckoutHeader from "./CheckoutHeader";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { Cart } from "@/types/cartProduct";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatPrice } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const steps = [
  {
    id: "Step 1",
    name: "Billing Address",
    fields: [
      "billingFirstName",
      "billingLastName",
      "billingCompanyName",
      "billingPhone",
      "billingStreetAddress",
      "billingCity",
      "billingState",
      "billingZipCode",
      "billingCountry",
    ],
  },
  {
    id: "Step 2",
    name: "Shipping Address",
    fields: [
      "shippingSameAsBilling",
      "shippingFirstName",
      "shippingLastName",
      "shippingCompanyName",
      "shippingPhone",
      "shippingStreetAddress",
      "shippingCity",
      "shippingState",
      "shippingZipCode",
      "shippingCountry",
    ],
  },
  { id: "Step 3", name: "Payment Information" },
];

export default function CheckoutForm({
  sessionId,
  paymentId,
  cart,
}: {
  sessionId: string;
  paymentId: string;
  cart: Cart;
}) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("STRIPE");
  const delta = currentStep - previousStep;
  const stripe = useStripe();
  const elements = useElements();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<checkoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
  });

  const isSame = watch("shippingSameAsBilling");

  useEffect(() => {
    if (isSame) {
      setValue("shippingFirstName", getValues("billingFirstName"));
      setValue("shippingLastName", getValues("billingLastName"));
      setValue("shippingCompanyName", getValues("billingCompanyName"));
      setValue("shippingPhone", getValues("billingPhone"));
      setValue("shippingStreetAddress", getValues("billingStreetAddress"));
      setValue("shippingCity", getValues("billingCity"));
      setValue("shippingState", getValues("billingState"));
      setValue("shippingZipCode", getValues("billingZipCode"));
      setValue("shippingCountry", getValues("billingCountry"));
    } else {
      setValue("shippingFirstName", "");
      setValue("shippingLastName", "");
      setValue("shippingCompanyName", "");
      setValue("shippingPhone", "");
      setValue("shippingStreetAddress", "");
      setValue("shippingCity", "");
      setValue("shippingState", "");
      setValue("shippingZipCode", "");
      setValue("shippingCountry", "");
    }
  }, [isSame, setValue, getValues]);

  const { execute } = useAction(createOrder, {
    onSuccess: (data) => {
      toast.success(data.success);
    },
  });

  const processForm: SubmitHandler<checkoutFormType> = async (data) => {
    Object.assign(data, {
      sessionId: sessionId,
      paymentId: paymentId,
      paymentMethod: paymentMethod,
    });
    return execute(data);
  };

  type FieldName = keyof checkoutFormType;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });
    if (!output) return;
    if (currentStep < steps.length - 1) {
      // if (currentStep === steps.length - 2) {
      //   handleSubmit(processForm)();
      // }
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const addressForm = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      sessionId,
      billingAddress: {
        firstName: "",
        lastName: "",
        companyName: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      shippingAddress: {
        firstName: "",
        lastName: "",
        companyName: "",
        phone: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
    },
  });

  const handleSubmitFrm = async (e: any) => {
    e.preventDefault();

    setIsProcessing(true);
    if (!stripe || !elements) {
      setIsProcessing(false);
      return;
    }

    // Create Order
    await handleSubmit(processForm)();

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-placed`,
      },
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // TODO: redirect the user on the orders page
      toast.success("Payment Success 🎉");
    } else {
      toast.error("Unexpected Error");
    }

    setIsProcessing(false);
  };

  return (
    <>
      <CheckoutHeader />

      <section className="border-t-4 border-primary p-5 bg-white">
        <Link
          href="/cart"
          className="flex items-center gap-x-1 font-bold uppercase tracking-tight text-sm hover:underline mb-5 text-primary"
        >
          <ArrowLeft size={20} />
          Back to cart
        </Link>
        <Separator className="my-3" />

        <div className="flex flex-col lg:flex-row items-start justify-between gap-5">
          <div className="w-full">
            {/* Steps */}
            <nav aria-label="Progress" className="mx-10 my-5">
              <ol
                role="list"
                className="space-y-4 md:flex md:space-x-8 md:space-y-0"
              >
                {steps.map((step, index) => (
                  <li key={step.name} className="md:flex-1">
                    {currentStep > index ? (
                      <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                        <span className="text-sm font-medium text-primary transition-colors ">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    ) : currentStep === index ? (
                      <div
                        className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                        aria-current="step"
                      >
                        <span className="text-sm font-medium text-primary">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    ) : (
                      <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                        <span className="text-sm font-medium text-gray-500 transition-colors">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </nav>

            {/* Form */}
            <form className="mt-12 py-12">
              {/* Step 1 */}
              {currentStep === 0 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Billing Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Provide your billing details.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="billingFirstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="First name"
                          id="billingFirstName"
                          {...register("billingFirstName")}
                          autoComplete="given-name"
                        />
                        {errors.billingFirstName?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingFirstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="billingLastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="Last name"
                          id="billingLastName"
                          {...register("billingLastName")}
                          autoComplete="Last-name"
                        />
                        {errors.billingLastName?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingLastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="billingStreetAddress"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street Address
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="12 Ave, Suite 330"
                          id="billingStreetAddress"
                          {...register("billingStreetAddress")}
                          autoComplete="billingStreetAddress"
                        />
                        {errors.billingStreetAddress?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingStreetAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="billingCompanyName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Company Name (Optional)
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="buyurparts corp."
                          id="billingCompanyName"
                          {...register("billingCompanyName")}
                          autoComplete="billingCompanyName"
                        />
                        {errors.billingCompanyName?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingCompanyName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="billingPhone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone number (Optional)
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder=""
                          id="billingPhone"
                          {...register("billingPhone")}
                          autoComplete="billingPhone"
                        />
                        {errors.billingPhone?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingPhone.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="billingCity"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="Vatican City"
                          id="billingCity"
                          {...register("billingCity")}
                          autoComplete="billingCity"
                        />
                        {errors.billingCity?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingCity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="billingZipCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Zip Code
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="89774"
                          id="billingZipCode"
                          {...register("billingZipCode")}
                          autoComplete="billingZipCode"
                        />
                        {errors.billingZipCode?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingZipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="billingState"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="Florida"
                          id="billingState"
                          {...register("billingState")}
                          autoComplete="billingState"
                        />
                        {errors.billingState?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingState.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingCountry"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="billingCountry"
                          {...register("billingCountry")}
                          autoComplete="billingCountry"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>United States</option>
                        </select>
                        {errors.billingCountry?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.billingCountry.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}

              {currentStep === 1 && (
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Shipping Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Address where you can receive your order.
                  </p>

                  <div>
                    <input
                      type="checkbox"
                      {...register("shippingSameAsBilling")}
                      id="shippingSameAsBilling"
                      // checked={true}
                    />
                    <label htmlFor="shippingSameAsBilling">
                      Shipping is same as Billing
                    </label>

                    {errors.shippingSameAsBilling?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.shippingSameAsBilling.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* Shipping Fields */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingFirstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="First name"
                          id="shippingFirstName"
                          {...register("shippingFirstName")}
                          autoComplete="shippingFirstName"
                        />
                        {errors.shippingFirstName?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingFirstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingLastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="Last name"
                          id="shippingLastName"
                          {...register("shippingLastName")}
                          autoComplete="shippingLastName"
                        />
                        {errors.shippingLastName?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingLastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="shippingStreetAddress"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street Address
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="12 Ave, Suite 330"
                          id="shippingStreetAddress"
                          {...register("shippingStreetAddress")}
                          autoComplete="shippingStreetAddress"
                        />
                        {errors.shippingStreetAddress?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingStreetAddress.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="shippingCompanyName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Company Name (Optional)
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="buyurparts corp."
                          id="shippingCompanyName"
                          {...register("shippingCompanyName")}
                          autoComplete="shippingCompanyName"
                        />
                        {errors.shippingCompanyName?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingCompanyName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingPhone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone number (Optional)
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder=""
                          id="shippingPhone"
                          {...register("shippingPhone")}
                          autoComplete="shippingPhone"
                        />
                        {errors.shippingPhone?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingPhone.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingCity"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="Vatican City"
                          id="shippingCity"
                          {...register("shippingCity")}
                          autoComplete="shippingCity"
                        />
                        {errors.shippingCity?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingCity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingZipCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Zip Code
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="89774"
                          id="shippingZipCode"
                          {...register("shippingZipCode")}
                          autoComplete="shippingZipCode"
                        />
                        {errors.shippingZipCode?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingZipCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingState"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <Input
                          type="text"
                          placeholder="Florida"
                          id="shippingState"
                          {...register("shippingState")}
                          autoComplete="shippingState"
                        />
                        {errors.shippingState?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingState.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="shippingCountry"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="shippingCountry"
                          {...register("shippingCountry")}
                          autoComplete="shippingCountry"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                          <option>United States</option>
                        </select>
                        {errors.shippingCountry?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.shippingCountry.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {currentStep === 2 && (
                <>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Complete
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    <PaymentElement className="w-[380px]" />
                  </p>
                </>
              )}
            </form>
            {/* Navigation */}
            <div className="mt-8 pt-5">
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prev}
                  disabled={currentStep === 0}
                  className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <Button
                  type="button"
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className={currentStep === steps.length - 1 ? "hidden" : ""}
                  // className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>Continue</span>
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <h3 className="font-semibold text-lg mt-2">Order Summary</h3>
            {cart && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(cart.items).map(([key, item]) => (
                    <TableRow key={key}>
                      <TableCell>
                        <Image
                          src={item.product.productImages[0].url}
                          alt={item.product.productTitle}
                          height={70}
                          width={70}
                          className="border rounded-lg"
                        />
                      </TableCell>
                      <TableCell>
                        <h3 className="text-xs leading-tight">
                          {item.product.productTitle} x <b>{item.qty}</b>
                        </h3>
                        <span>{/* Seller Name */}</span>
                      </TableCell>
                      <TableCell>
                        <h3 className="font-semibold">
                          {formatPrice(item.product.salePrice * item.qty)}
                        </h3>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            <Separator className="border-dotted border" />
            <Table>
              <TableBody>
                <TableRow className="flex justify-between">
                  <TableCell>Subtotal:</TableCell>
                  <TableCell>
                    <b>{formatPrice(cart.subTotal)}</b>
                  </TableCell>
                </TableRow>
                <TableRow className="flex justify-between">
                  <TableCell>Shipping:</TableCell>
                  <TableCell>
                    <b>{formatPrice(cart.totalShippingPrice)}</b>
                  </TableCell>
                </TableRow>
                <TableRow className="flex justify-between">
                  <TableCell>Tax:</TableCell>
                  <TableCell>
                    <b>{formatPrice(cart.tax)}</b>
                  </TableCell>
                </TableRow>
                <TableRow className="flex justify-between">
                  <TableCell>
                    <b>Total:</b>
                  </TableCell>
                  <TableCell>
                    <b>{formatPrice(cart.totalAmount)}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Separator />

            {/* <div className="flex gap-x-5 border rounded-lg p-3 mt-5">
              <PaymentElement className="w-[380px]" />
            </div> */}

            <Button
              disabled={
                isProcessing || !stripe || !elements || currentStep != 2
              }
              type="submit"
              className="my-5 w-full"
              onClick={handleSubmitFrm}
            >
              <span id="button-text">
                {isProcessing ? "Processing..." : "COMPLETE PURCHASE"}
              </span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

// <div>
//   <Form {...addressForm}>
//     {/* FIXME: fix the address form */}
//     <form
//       onSubmit={addressForm.handleSubmit(onSubmit)}
//       className="flex flex-col lg:flex-row items-start justify-between"
//     >
//       <div className="w-full space-y-2">
//         <h3 className="font-semibold text-lg mt-2">Billing Details</h3>

//         <div className="max-w-2xl">
//           <div className="flex items-center space-x-5">
//             <FormField
//               control={addressForm.control}
//               name="billingAddress.firstName"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>First Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="John"
//                       {...field}
//                       autoComplete="firstName"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={addressForm.control}
//               name="billingAddress.lastName"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>Last Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Doe"
//                       {...field}
//                       autoComplete="lastName"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <FormField
//             control={addressForm.control}
//             name="billingAddress.companyName"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Company Name (Optional)</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="ABC Corp"
//                     {...field}
//                     autoComplete="CompanyName"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={addressForm.control}
//             name="billingAddress.phone"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Phone:</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="123-456-789-0"
//                     {...field}
//                     autoComplete="phone"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={addressForm.control}
//             name="billingAddress.streetAddress"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Street Address:</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="1 Park Avenue"
//                     {...field}
//                     autoComplete="streetAddress"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex items-center gap-x-5">
//             <FormField
//               control={addressForm.control}
//               name="billingAddress.city"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>City:</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="New Orleans"
//                       {...field}
//                       autoComplete="city"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={addressForm.control}
//               name="billingAddress.zipCode"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>ZIP Code:</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="15989"
//                       {...field}
//                       autoComplete="zipCode"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={addressForm.control}
//               name="billingAddress.state"
//               render={({ field }) => (
//                 <FormItem className="w-full">
//                   <FormLabel>State:</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Louisiana"
//                       {...field}
//                       autoComplete="state"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </div>
//       </div>
//       <div className="max-w-xl">
//         <h3 className="font-semibold text-lg mt-2">Order Summary</h3>
//         {cart && (
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead></TableHead>
//                 <TableHead>Subtotal</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {Object.entries(cart.items).map(([key, item]) => (
//                 <TableRow key={key}>
//                   <TableCell>
//                     <Image
//                       src={item.product.productImages[0].url}
//                       alt={item.product.productTitle}
//                       height={70}
//                       width={70}
//                       className="border rounded-lg"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <h3 className="text-xs leading-tight">
//                       {item.product.productTitle} x <b>{item.qty}</b>
//                     </h3>
//                     <span>{/* Seller Name */}</span>
//                   </TableCell>
//                   <TableCell>
//                     <h3 className="font-semibold">
//                       {formatPrice(item.product.salePrice * item.qty)}
//                     </h3>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         )}
//         <Separator className="border-dotted border" />
//         <Table>
//           <TableBody>
//             <TableRow className="flex justify-between">
//               <TableCell>Subtotal:</TableCell>
//               <TableCell>
//                 <b>{formatPrice(cart.subTotal)}</b>
//               </TableCell>
//             </TableRow>
//             <TableRow className="flex justify-between">
//               <TableCell>Shipping:</TableCell>
//               <TableCell>
//                 <b>{formatPrice(cart.totalShippingPrice)}</b>
//               </TableCell>
//             </TableRow>
//             <TableRow className="flex justify-between">
//               <TableCell>Tax:</TableCell>
//               <TableCell>
//                 <b>{formatPrice(cart.tax)}</b>
//               </TableCell>
//             </TableRow>
//             <TableRow className="flex justify-between">
//               <TableCell>
//                 <b>Total:</b>
//               </TableCell>
//               <TableCell>
//                 <b>{formatPrice(cart.totalAmount)}</b>
//               </TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>

//         <Separator />

//         <div className="flex gap-x-5 border rounded-lg p-3 mt-5">
//           <PaymentElement className="w-[380px]" />
//         </div>

//         <Button
//           disabled={isProcessing || !stripe || !elements}
//           type="submit"
//           className="my-5 w-full"
//           onClick={handleSubmitFrm}
//         >
//           <span id="button-text">
//             {isProcessing ? "Processing..." : "COMPLETE PURCHASE"}
//           </span>
//         </Button>
//       </div>
//     </form>
//   </Form>
// </div>;
