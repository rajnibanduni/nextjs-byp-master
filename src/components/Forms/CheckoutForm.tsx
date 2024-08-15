"use client";

import { checkoutFormSchema, checkoutFormType } from "@/types/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useController } from "react-hook-form";
import { CheckoutFormDefaultValues, US_STATES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, FormControl } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { motion } from "framer-motion";
import { fetchCityAndState } from "@/actions/ZipCodeAction";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  CardElement,
  CardElementProps,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Cart } from "@/types/cartProduct";
import { formatPrice } from "@/lib/utils";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Info, LoaderCircle, LockKeyhole, Plus, Truck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import ScrollToTopButton from "../ScrollToTopButton";
import { createOrder } from "@/actions/CheckoutAction";
import CouponCodeForm from "./CouponCodeForm";

export default function CheckoutForm({
  cart,
  sessionId,
}: {
  cart: Cart;
  sessionId: string;
}) {
  // const router = useRouter();
  const [zipCodeProcessing, setZipCodeProcessing] = useState(false);

  // Stripe
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState<{ message?: string } | null>();
  const [orderProcessingError, setOrderProcessingError] = useState<{
    message: Array<string>;
  }>();
  const [zipCodeError, setZipCodeError] = useState<{ message?: string } | null>(
    null
  );
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const form = useForm<checkoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: CheckoutFormDefaultValues,
  });

  const isSame = form.watch("shippingSameAsBilling");
  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = async (values: checkoutFormType) => {
    switch (paymentMethod) {
      case "CARD":
        setProcessing(true);
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          setProcessing(false);
          return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
          setProcessing(false);
          return;
        }

        // Validate card fields
        if (cardError) {
          card.focus();
          setProcessing(false);
          return;
        }

        if (!cardComplete) {
          card.focus();
          setCardError({ message: "Card details are incomplete" });
          setProcessing(false);
          return;
        }

        if (zipCodeError) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setProcessing(false);
          return;
        }

        //  Create Order and retrieve client secret
        Object.assign(values, {
          sessionId: sessionId,
          paymentMethod: paymentMethod,
        });

        const result = await createOrder(values);

        if (!result) {
          setProcessing(false);
          toast.error(
            "Unable to process the order at the moment. Please try again later."
          );
          return;
        }

        if (result.data?.error) {
          setOrderProcessingError({ message: result.data.error.message });
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setProcessing(false);
          return;
        }

        // if (!result.data?.clientSecret) {
        //   setOrderProcessingError({
        //     message: ["Unable to process the order at the moment"],
        //   });
        //   setProcessing(false);
        //   return;
        // }

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          result.data?.clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                name: values.billingFirstName + " " + values.billingLastName,
              },
            },
          }
        );

        if (error) {
          setCardError(error);
          card.focus();
          toast.error(error.message);
          setProcessing(false);
          return;
        }

        if (paymentIntent?.status === "succeeded") {
          window.location.href = `/thank-you?orderId=${result.data?.order.orderId}`;
          setProcessing(false);
        }
        break;

      case "PAYPAL":
        // Handle PayPal payment

        toast.error(
          "PayPal is not supporting yet. Try entering card details instead!"
        );
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const resetShippingFields = () => {
      form.resetField("shippingZipCode");
      form.resetField("shippingFirstName");
      form.resetField("shippingLastName");
      form.resetField("shippingCompanyName");
      form.resetField("shippingPhone");
      form.resetField("shippingStreetAddress");
      form.resetField("shippingCity");
      // form.resetField("shippingState");
    };

    if (!isSame) {
      resetShippingFields();
    }

    // if (paymentMethod === "PAYPAL") {
    //   setCardError(null);
    //   setCardComplete(false);
    // }
  }, [isSame, form, paymentMethod]);

  if (isSame) {
    form.setValue("shippingFirstName", form.watch("billingFirstName"));
    form.setValue("shippingLastName", form.watch("billingLastName"));
    form.setValue("shippingCompanyName", form.watch("billingCompanyName"));
    form.setValue("shippingPhone", form.watch("billingPhone"));
    form.setValue("shippingStreetAddress", form.watch("billingStreetAddress"));
    form.setValue("shippingCity", form.watch("billingCity"));
    form.setValue("shippingState", form.watch("billingState"));
    form.setValue("shippingZipCode", form.watch("billingZipCode"));
  }

  const handleZipChange = async (zipCode: string, isBilling = true) => {
    setZipCodeError(null);
    const fieldPrefix = isBilling ? "billing" : "shipping";
    form.setValue(`${fieldPrefix}ZipCode`, zipCode);
    if (zipCode && zipCode.length >= 5) {
      setZipCodeProcessing(true);
      try {
        const { city, state, stateAbbr, error } = await fetchCityAndState(
          zipCode
        );

        if (error) {
          form.setError(`${fieldPrefix}ZipCode`, { message: error });
          setZipCodeError({ message: error });
          if (!isBilling) {
            form.setValue("shippingCity", "");
            form.setValue("shippingState", "");
          }
        } else {
          setZipCodeError(null);
          form.setValue(`${fieldPrefix}City`, city);
          form.setValue(`${fieldPrefix}State`, stateAbbr);
          // form.control._defaultValues.billingState == state;
        }
        form.setValue(`${fieldPrefix}ZipCode`, zipCode);
      } catch (e) {
        form.setError(`${fieldPrefix}ZipCode`, {
          message: "An unexpected error occurred",
        });
        setZipCodeProcessing(false);
      } finally {
        setZipCodeProcessing(false);
      }
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-3">
        <div className="lg:col-span-3 md:col-span-3">
          {/* Express Checkout */}
          <section>
            <fieldset className="border border-solid border-gray-300 p-5">
              <legend className="text-sm font-semibold text-center px-5">
                Express Checkout
              </legend>
              <div className="flex items-center gap-x-3">
                {/* <Button
                className="w-full bg-yellow-300 text-zinc-900 h-14"
                variant={"outline"}
              >
                Amazon Pay
              </Button> */}
                <Button
                  className="w-full bg-yellow-400 text-zinc-900 h-14"
                  variant={"outline"}
                >
                  <svg
                    width="100"
                    height="27"
                    viewBox="-1.35569997 -1.35569997 180.87454994 47.90139894"
                  >
                    <title>PayPal</title>
                    <path
                      d="M 32.60643,3.4075 C 30.51393,1.0225 26.73143,0 21.89268,0 L 7.84893,0 C 6.85893,0 6.01768,0.72 5.86268,1.69625 L 0.01518001,38.7825 c -0.11625,0.73125 0.45,1.39375 1.19124999,1.39375 l 8.67,0 2.1775,-13.81125 -0.0675,0.4325 c 0.155,-0.97625 0.99,-1.69625 1.97875,-1.69625 l 4.12,0 c 8.09375,0 14.43125,-3.2875 16.2825,-12.7975 0.055,-0.28125 0.1025,-0.555 0.14375,-0.8225 -0.23375,-0.12375 -0.23375,-0.12375 0,0 0.55125,-3.515 -0.004,-5.9075 -1.905,-8.07375"
                      fill="#003087"
                      fillOpacity="1"
                      fillRule="nonzero"
                      stroke="none"
                    ></path>
                    <path
                      d="m 122.18243,20.94413 -4.66625,0 c -0.44625,0 -0.86375,0.22125 -1.11375,0.59125 l -6.4375,9.48 -2.7275,-9.11 c -0.17125,-0.57 -0.69625,-0.96125 -1.29125,-0.96125 l -4.58625,0 c -0.55375,0 -0.94375,0.545 -0.765,1.06875 l 5.1375,15.0825 -4.8325,6.81875 c -0.37875,0.535 0.004,1.275 0.66,1.275 l 4.66125,0 c 0.44125,0 0.855,-0.21625 1.1075,-0.57875 l 15.5175,-22.3975 c 0.37125,-0.53625 -0.0113,-1.26875 -0.66375,-1.26875 m -31.19587,9.03612 c -0.44875,2.6525 -2.55375,4.43375 -5.24,4.43375 -1.34625,0 -2.425,-0.43375 -3.1175,-1.25375 -0.68625,-0.8125 -0.945,-1.97125 -0.7275,-3.26 0.4175,-2.63 2.5575,-4.4675 5.2025,-4.4675 1.31875,0 2.38875,0.4375 3.095,1.265 0.71125,0.83375 0.99125,1.99875 0.7875,3.2825 m 6.47,-9.03625 -4.6425,0 c -0.3975,0 -0.73625,0.28875 -0.79875,0.6825 l -0.20375,1.2975 -0.32375,-0.47 c -1.00625,-1.45875 -3.2475,-1.9475 -5.485,-1.9475 -5.12875,0 -9.51,3.8875 -10.3625,9.33875 -0.44375,2.72 0.18625,5.31875 1.72875,7.1325 1.41625,1.66625 3.4375,2.36 5.84625,2.36 4.135,0 6.4275,-2.655 6.4275,-2.655 l -0.2075,1.29 c -0.0775,0.49 0.30125,0.93375 0.79875,0.93375 l 4.18,0 c 0.66375,0 1.2275,-0.48125 1.33125,-1.13625 l 2.51,-15.8925 c 0.0775,-0.49 -0.3025,-0.93375 -0.79875,-0.93375 m -27.85913,0.1115 c -0.53,3.48 -3.1875,3.48 -5.75875,3.48 l -1.4625,0 1.02625,-6.4975 c 0.0612,-0.3925 0.4,-0.68125 0.7975,-0.68125 l 0.67125,0 c 1.75,0 3.4025,0 4.255,0.99625 0.51,0.59625 0.66375,1.48125 0.47125,2.7025 m -1.11875,-9.08 -9.695,0 c -0.66375,0 -1.2275,0.4825 -1.33125,1.1375 l -3.92,24.86 c -0.0775,0.49 0.30125,0.93375 0.7975,0.93375 l 4.63,0 c 0.6625,0 1.22625,-0.4825 1.33,-1.13625 l 1.05875,-6.7075 c 0.1025,-0.655 0.6675,-1.1375 1.33,-1.1375 l 3.0675,0 c 6.38625,0 10.0725,-3.09 11.035,-9.21625 0.43375,-2.6775 0.0175,-4.7825 -1.23625,-6.25625 -1.37875,-1.62 -3.8225,-2.4775 -7.06625,-2.4775"
                      fill="#002f86"
                      fillOpacity="1"
                      fillRule="nonzero"
                      stroke="none"
                    ></path>
                    <path
                      d="m 172.07806,12.65863 -3.97875,25.315 c -0.0775,0.49 0.30125,0.93375 0.7975,0.93375 l 4.0025,0 c 0.6625,0 1.2275,-0.4825 1.33,-1.1375 l 3.92375,-24.86 c 0.0775,-0.49 -0.30125,-0.93375 -0.79875,-0.93375 l -4.4775,0 c -0.39875,0 -0.7375,0.28875 -0.79875,0.6825 m -11.94175,17.32162 c -0.44875,2.6525 -2.55375,4.43375 -5.24,4.43375 -1.34625,0 -2.425,-0.43375 -3.1175,-1.25375 -0.6875,-0.8125 -0.945,-1.97125 -0.7275,-3.26 0.4175,-2.63 2.5575,-4.4675 5.2025,-4.4675 1.31875,0 2.38875,0.4375 3.095,1.265 0.71125,0.83375 0.99125,1.99875 0.7875,3.2825 m 6.47,-9.03625 -4.6425,0 c -0.3975,0 -0.73625,0.28875 -0.79875,0.6825 l -0.20375,1.2975 -0.325,-0.47 c -1.005,-1.45875 -3.24625,-1.9475 -5.48375,-1.9475 -5.12875,0 -9.51,3.8875 -10.3625,9.33875 -0.44375,2.72 0.18625,5.31875 1.72875,7.1325 1.41625,1.66625 3.4375,2.36 5.84625,2.36 4.135,0 6.4275,-2.655 6.4275,-2.655 l -0.2075,1.29 c -0.0775,0.49 0.30125,0.93375 0.79875,0.93375 l 4.18,0 c 0.66375,0 1.2275,-0.48125 1.33125,-1.13625 l 2.51,-15.8925 c 0.0775,-0.49 -0.3025,-0.93375 -0.79875,-0.93375 m -27.85925,0.1115 c -0.53,3.48 -3.1875,3.48 -5.75875,3.48 l -1.4625,0 1.02625,-6.4975 c 0.0613,-0.3925 0.4,-0.68125 0.7975,-0.68125 l 0.67125,0 c 1.75,0 3.4025,0 4.255,0.99625 0.51,0.59625 0.66375,1.48125 0.47125,2.7025 m -1.11875,-9.08 -9.695,0 c -0.66375,0 -1.2275,0.4825 -1.33125,1.1375 l -3.92,24.86 c -0.0775,0.49 0.3025,0.93375 0.7975,0.93375 l 4.975,0 c 0.46375,0 0.85875,-0.3375 0.93125,-0.795 l 1.1125,-7.04875 c 0.1025,-0.655 0.6675,-1.1375 1.33,-1.1375 l 3.0675,0 c 6.38625,0 10.0725,-3.09 11.035,-9.21625 0.43375,-2.6775 0.0175,-4.7825 -1.23625,-6.25625 -1.37875,-1.62 -3.8225,-2.4775 -7.06625,-2.4775"
                      fill="#009cde"
                      fillOpacity="1"
                      fillRule="nonzero"
                      stroke="none"
                    ></path>
                    <path
                      d="M 32.60643,3.4075 C 30.51393,1.0225 26.73143,0 21.89268,0 L 7.84893,0 C 6.85893,0 6.01768,0.72 5.86268,1.69625 L 0.01518001,38.7825 c -0.11625,0.73125 0.45,1.39375 1.19124999,1.39375 l 8.67,0 2.1775,-13.81125 -0.0675,0.4325 c 0.155,-0.97625 0.99,-1.69625 1.97875,-1.69625 l 4.12,0 c 8.09375,0 14.43125,-3.2875 16.2825,-12.7975 0.055,-0.28125 0.1025,-0.555 0.14375,-0.8225 -0.23375,-0.12375 -0.23375,-0.12375 0,0 0.55125,-3.515 -0.004,-5.9075 -1.905,-8.07375"
                      fill="#003087"
                      fillOpacity="1"
                      fillRule="nonzero"
                      stroke="none"
                    ></path>
                    <path
                      d="m 14.39418,11.52788 c 0.0925,-0.5875 0.47,-1.06875 0.9775,-1.3125 0.23125,-0.11 0.48875,-0.17125 0.75875,-0.17125 l 11.01,0 c 1.30375,0 2.52,0.085 3.63125,0.26375 0.31875,0.0512 0.6275,0.11 0.9275,0.1775 0.3,0.0662 0.59125,0.14125 0.87375,0.22375 0.14125,0.0412 0.28,0.0838 0.41625,0.12875 0.54625,0.1825 1.055,0.395 1.5225,0.64375 0.55125,-3.51625 -0.004,-5.9075 -1.905,-8.07375 -2.09375,-2.385 -5.875,-3.4075 -10.71375,-3.4075 l -14.045,0 c -0.98875,0 -1.83,0.72 -1.985,1.69625 l -5.84749999,37.085 c -0.11625,0.7325 0.45,1.39375 1.18999999,1.39375 l 8.67125,0 2.1775,-13.81125 2.34,-14.83625 z"
                      fill="#002f86"
                      fillOpacity="1"
                      fillRule="nonzero"
                      stroke="none"
                    ></path>
                    <path
                      d="m 34.51168,11.48125 0,0 c -0.0425,0.26875 -0.0888,0.54125 -0.14375,0.8225 -1.85125,9.50875 -8.18875,12.7975 -16.2825,12.7975 l -4.12125,0 c -0.98875,0 -1.82375,0.72 -1.9775,1.69625 l -2.11,13.3775 -0.59875,3.795 c -0.10125,0.64 0.39375,1.22 1.04125,1.22 l 7.30875,0 c 0.865,0 1.60125,-0.63 1.73625,-1.48375 l 0.0713,-0.3725 1.3775,-8.73 0.0888,-0.4825 c 0.135,-0.85375 0.87125,-1.48375 1.73625,-1.48375 l 1.09375,0 c 7.08,0 12.62375,-2.87625 14.24375,-11.195 0.67625,-3.47625 0.32625,-6.37875 -1.4625,-8.4175 -0.5425,-0.6175 -1.21625,-1.1275 -2.00125,-1.54375"
                      fill="#009cde"
                      fillOpacity="1"
                      fillRule="nonzero"
                      stroke="none"
                    ></path>
                    <path
                      d="m 32.57331,10.70863 c -0.2825,-0.0825 -0.57375,-0.1575 -0.87375,-0.22375 -0.3,-0.0663 -0.61,-0.125 -0.9275,-0.17625 -1.1125,-0.18 -2.3275,-0.265 -3.6325,-0.265 l -11.00875,0 c -0.27125,0 -0.52875,0.0613 -0.75875,0.1725 -0.50875,0.24375 -0.885,0.72375 -0.9775,1.3125 l -2.34,14.83625 -0.0675,0.4325 c 0.15375,-0.97625 0.98875,-1.69625 1.9775,-1.69625 l 4.12125,0 c 8.09375,0 14.43125,-3.2875 16.2825,-12.7975 0.055,-0.28125 0.10125,-0.55375 0.14375,-0.8225 -0.46875,-0.2475 -0.97625,-0.46125 -1.5225,-0.6425 -0.13625,-0.045 -0.275,-0.0888 -0.41625,-0.13"
                      fill="#012069"
                      fillOpacity="1"
                      fillRule="nonzero"
                      stroke="none"
                    ></path>
                  </svg>
                </Button>
                <Button
                  className="w-full h-14 bg-zinc-900 hover:bg-zinc-700"
                  variant={"outline"}
                >
                  <Image
                    src={"/images/32px-Apple_Pay_logo.png"}
                    alt={"apple pay"}
                    height={60}
                    width={60}
                    className="invert h-auto w-auto"
                  />
                </Button>
              </div>
            </fieldset>
          </section>
          <div className="relative flex my-10 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-gray-500 font-medium text-sm tracking-wide">
              OR CONTINUE BELOW TO PAY WITH CREDIT A CARD
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>
          {/* Errors */}
          <div
            className={`${
              orderProcessingError || zipCodeError ? "block" : "hidden"
            } bg-red-100 rounded-lg p-4 mt-2 mb-7`}
          >
            {orderProcessingError && (
              <ul className="list-disc px-2">
                {orderProcessingError.message?.map((error) => (
                  <li className="text-red-500 font-semibold" key={error}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
            {zipCodeError && (
              <ul className="list-disc px-2">
                <li className="text-red-500 font-semibold">
                  {zipCodeError.message}
                </li>
              </ul>
            )}
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex-1 space-y-6"
            >
              <motion.div animate={{ transition: { duration: 1 } }}>
                <section className="mb-7 space-y-4">
                  <h1 className="text-xl font-bold md:text-2xl">
                    Billing Address
                  </h1>
                  <p className="text-dark-700">
                    Fill this form to complete your order.
                  </p>
                </section>

                {/* Billing Form Fields */}
                <section className="space-y-4">
                  {/* EMAIL & PHONE */}
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="billingFirstName"
                      label="First Name *"
                      placeholder="Enter first name"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="billingLastName"
                      label="Last Name *"
                      placeholder="Enter Last name"
                    />
                  </div>
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="billingCompanyName"
                    label="Company Name"
                    placeholder="Stark Industries"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="billingStreetAddress"
                    label="Street Address *"
                    placeholder="ex. 123 Main St"
                  />
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                      fieldType={FormFieldType.PHONE_INPUT}
                      control={form.control}
                      name="billingPhone"
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="billingCity"
                      label="City *"
                      placeholder="Enter city"
                    />
                  </div>

                  {/* Zip Code / State */}
                  <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="billingState"
                      label="State *"
                      placeholder="Select a state"
                    >
                      {US_STATES.map((state, i) => (
                        <SelectItem key={i} value={state.value}>
                          <p>{state.name}</p>
                        </SelectItem>
                      ))}
                    </CustomFormField>

                    <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form.control}
                      name="billingZipCode"
                      label="ZIP Code *"
                      renderSkeleton={() => (
                        <div className="flex rounded-md border border-zinc-500">
                          <FormControl>
                            <Input
                              onChange={(e) =>
                                handleZipChange(e.target.value, true)
                              }
                              placeholder="ex. 12345"
                              maxLength={5}
                              disabled={zipCodeProcessing}
                              className="placeholder:text-zinc-400 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                            />
                          </FormControl>
                        </div>
                      )}
                    />
                  </div>

                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="shippingSameAsBilling"
                    label="Shipping and billing information are the same"
                  />
                </section>
              </motion.div>

              {/* Shipping Form Fields */}
              {!isSame && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1 } }}
                >
                  <section className="mb-7 space-y-4">
                    <h1 className="text-xl font-bold md:text-2xl">
                      Shipping Address
                    </h1>
                  </section>

                  <section className="space-y-4">
                    {/* EMAIL & PHONE */}
                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="shippingFirstName"
                        label="First Name *"
                        placeholder="Enter first name"
                      />
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="shippingLastName"
                        label="Last Name *"
                        placeholder="Enter last name"
                      />
                    </div>
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="shippingCompanyName"
                      label="Company Name"
                      placeholder="Stark Industries"
                    />
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="shippingStreetAddress"
                      label="Street Address *"
                      placeholder="ex. 123 Main St"
                    />
                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name="shippingPhone"
                        label="Phone Number"
                        placeholder="(555) 123-4567"
                      />
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name="shippingCity"
                        label="City *"
                        placeholder="Enter city"
                      />
                    </div>
                    {/* Zip Code / State */}

                    <div className="flex flex-col gap-6 xl:flex-row">
                      <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="shippingState"
                        label="State *"
                        placeholder="Select a state"
                      >
                        {US_STATES.map((state, i) => (
                          <SelectItem key={i} value={state.value}>
                            <p>{state.name}</p>
                          </SelectItem>
                        ))}
                      </CustomFormField>

                      <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name="shippingZipCode"
                        label="ZIP Code *"
                        renderSkeleton={() => (
                          <div className="flex rounded-md border border-zinc-500">
                            <FormControl>
                              <Input
                                onChange={(e) =>
                                  handleZipChange(e.target.value, false)
                                }
                                disabled={zipCodeProcessing}
                                placeholder="ex. 12345"
                                maxLength={5}
                                className="placeholder:text-zinc-400 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                              />
                            </FormControl>
                          </div>
                        )}
                      />
                    </div>
                  </section>
                </motion.div>
              )}

              {/* Payment Form */}
              <section className="border-y border-solid border-zinc-300 py-5">
                <h1 className="text-xl font-bold md:text-2xl mb-3">
                  Payment Options
                </h1>

                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="paymentMethod"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <RadioGroup
                        className="flex flex-col"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="radio-group space-y-3">
                          <RadioGroupItem value="CARD" id="card" />
                          <Label
                            htmlFor="card"
                            className="cursor-pointer ml-2 text-base"
                          >
                            Credit / Debit Card
                          </Label>

                          {paymentMethod === "CARD" && (
                            <motion.div
                              className="space-y-2"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                transition: { duration: 1 },
                              }}
                            >
                              <span className="flex gap-2 items-center">
                                <svg
                                  width="40"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 40 24"
                                >
                                  <title>Visa</title>
                                  <rect
                                    x=".5"
                                    y=".5"
                                    width="39"
                                    height="23"
                                    rx="1.5"
                                    fill="#fff"
                                    stroke="#DADCDF"
                                  ></rect>
                                  <g clipPath="url(#clip0)">
                                    <path
                                      d="M17.112 8.142l-3.142 7.737h-2.05l-1.547-6.174c-.093-.38-.174-.52-.46-.68-.466-.262-1.236-.506-1.913-.658l.046-.23h3.3c.215 0 .424.08.588.224a.94.94 0 01.306.565l.817 4.473 2.017-5.266 2.038.009zm8.032 5.21c.008-2.04-2.735-2.154-2.716-3.066.005-.277.26-.573.822-.648a3.554 3.554 0 011.912.345l.34-1.642a5.078 5.078 0 00-1.813-.344c-1.918 0-3.267 1.052-3.278 2.558-.012 1.113.963 1.735 1.698 2.105.755.38 1.009.623 1.007.962-.006.519-.604.748-1.162.757-.975.016-1.54-.271-1.99-.488l-.353 1.695c.453.214 1.29.401 2.157.411 2.038 0 3.37-1.039 3.376-2.647v.003zm5.063 2.52H32l-1.566-7.737H28.78a.863.863 0 00-.499.155.906.906 0 00-.327.418l-2.91 7.17h2.037l.404-1.156h2.488l.235 1.15zm-2.165-2.742l1.021-2.904.585 2.911-1.606-.007zm-8.159-4.995l-1.604 7.737H16.34l1.604-7.737h1.94z"
                                      fill="url(#visa-gradient)"
                                    ></path>
                                  </g>
                                  <defs>
                                    <linearGradient
                                      id="visa-gradient"
                                      x1="10.481"
                                      y1="15.788"
                                      x2="30.498"
                                      y2="8.349"
                                      gradientUnits="userSpaceOnUse"
                                    >
                                      <stop stopColor="#1A1E5A"></stop>
                                      <stop
                                        offset="1"
                                        stopColor="#122D98"
                                      ></stop>
                                    </linearGradient>
                                    <clipPath id="clip0">
                                      <path
                                        fill="#fff"
                                        transform="translate(8 8)"
                                        d="M0 0h24v8H0z"
                                      ></path>
                                    </clipPath>
                                  </defs>
                                </svg>
                                <svg
                                  width="40"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 40 24"
                                >
                                  <title>MasterCard</title>
                                  <rect
                                    x=".5"
                                    y=".5"
                                    width="39"
                                    height="23"
                                    rx="1.5"
                                    fill="#fff"
                                    stroke="#DADCDF"
                                  ></rect>
                                  <path
                                    d="M13.438 19.358V18.31a.612.612 0 00-.18-.48.631.631 0 00-.486-.182.664.664 0 00-.595.296.618.618 0 00-.56-.296.568.568 0 00-.496.247v-.206h-.368v1.668h.372v-.918a.385.385 0 01.101-.317.396.396 0 01.313-.126c.245 0 .369.157.369.44v.928h.372v-.925a.386.386 0 01.102-.317.4.4 0 01.312-.126c.252 0 .372.157.372.44v.928l.372-.007zm5.503-1.668h-.606v-.505h-.372v.506h-.336v.33h.343v.768c0 .387.153.618.588.618a.874.874 0 00.46-.13l-.105-.31a.686.686 0 01-.326.094c-.177 0-.245-.111-.245-.279v-.76h.602l-.003-.331zm3.142-.041a.505.505 0 00-.446.244v-.203h-.365v1.668h.368v-.935c0-.276.12-.429.354-.429a.607.607 0 01.23.042l.114-.349a.798.798 0 00-.262-.045l.007.007zm-4.75.174a1.283 1.283 0 00-.691-.174c-.429 0-.708.202-.708.533 0 .272.205.44.584.492l.177.025c.202.027.298.08.298.174 0 .129-.135.202-.386.202a.912.912 0 01-.564-.174l-.177.282c.215.148.472.224.733.217.49 0 .773-.227.773-.544 0-.318-.224-.447-.592-.5l-.177-.024c-.16-.02-.287-.052-.287-.164 0-.111.12-.195.322-.195.187.002.37.051.532.143l.163-.293zm9.867-.174a.505.505 0 00-.447.244v-.203h-.365v1.668h.369v-.935c0-.276.12-.429.354-.429a.608.608 0 01.23.042l.114-.349a.798.798 0 00-.262-.045l.007.007zm-4.747.872a.83.83 0 00.256.632.856.856 0 00.647.24.895.895 0 00.61-.2l-.178-.292a.75.75 0 01-.442.15.547.547 0 01-.356-.17.531.531 0 010-.727.547.547 0 01.356-.17.75.75 0 01.442.15l.177-.294a.894.894 0 00-.609-.198.867.867 0 00-.647.24.841.841 0 00-.256.632v.007zm3.45 0v-.83h-.368v.202a.642.642 0 00-.532-.244.893.893 0 00-.626.255.866.866 0 000 1.233.893.893 0 00.626.256.651.651 0 00.532-.245v.203h.368v-.83zm-1.37 0a.5.5 0 01.335-.444.52.52 0 01.547.127.502.502 0 01-.37.85.515.515 0 01-.375-.156.5.5 0 01-.138-.377zm-4.446-.872a.893.893 0 00-.623.264.865.865 0 00.018 1.233c.168.161.395.25.63.247a1.04 1.04 0 00.703-.227l-.177-.269a.814.814 0 01-.493.175.474.474 0 01-.337-.103.46.46 0 01-.17-.305h1.258v-.14c0-.523-.33-.872-.804-.872l-.005-.003zm0 .324a.427.427 0 01.3.115.414.414 0 01.128.29h-.885a.427.427 0 01.141-.293.44.44 0 01.309-.112h.007zm9.23.551v-1.503h-.355v.872a.642.642 0 00-.532-.244.893.893 0 00-.626.255.866.866 0 000 1.233.893.893 0 00.627.256.651.651 0 00.53-.245v.203h.355v-.827zm.614.591a.178.178 0 01.122.048.161.161 0 01-.055.268.168.168 0 01-.067.014.179.179 0 01-.16-.101.16.16 0 01.092-.216.178.178 0 01.073-.013h-.005zm0 .295a.128.128 0 00.092-.038.128.128 0 000-.175.13.13 0 00-.143-.028.132.132 0 00-.043.028.128.128 0 000 .175.134.134 0 00.1.038h-.006zm.01-.207c.017-.001.033.004.046.014a.044.044 0 01.016.036.041.041 0 01-.012.032.062.062 0 01-.037.015l.051.058h-.04l-.049-.058h-.015v.058h-.034v-.154l.074-.001zm-.039.03v.041h.04a.038.038 0 00.02 0 .017.017 0 00.002-.008c0-.002 0-.005-.002-.008a.016.016 0 00.002-.008c0-.002 0-.005-.002-.007a.038.038 0 00-.02 0l-.04-.01zm-1.948-.709a.5.5 0 01.336-.444.52.52 0 01.547.127.502.502 0 01-.37.85.515.515 0 01-.375-.155.5.5 0 01-.138-.378zm-12.439 0v-.834h-.368v.203a.64.64 0 00-.531-.244.893.893 0 00-.626.255.866.866 0 000 1.233.893.893 0 00.626.256.651.651 0 00.531-.245v.203h.368v-.827zm-1.37 0a.5.5 0 01.335-.444.52.52 0 01.547.127.502.502 0 01-.369.85.516.516 0 01-.377-.154.499.499 0 01-.14-.379h.004z"
                                    fill="#231F20"
                                  ></path>
                                  <path
                                    d="M22.79 4.985h-5.58v9.873h5.58V4.985z"
                                    fill="#FF5F00"
                                  ></path>
                                  <path
                                    d="M17.565 9.923a6.19 6.19 0 01.64-2.745A6.288 6.288 0 0120 4.985a6.463 6.463 0 00-6.727-.71 6.344 6.344 0 00-2.618 2.316 6.209 6.209 0 00-.97 3.331c0 1.178.336 2.332.97 3.33a6.343 6.343 0 002.618 2.317 6.463 6.463 0 006.727-.71 6.288 6.288 0 01-1.795-2.192 6.19 6.19 0 01-.64-2.744z"
                                    fill="#EB001B"
                                  ></path>
                                  <path
                                    d="M30.317 9.922a6.208 6.208 0 01-.972 3.332 6.343 6.343 0 01-2.618 2.316A6.463 6.463 0 0120 14.858a6.297 6.297 0 001.795-2.192 6.198 6.198 0 000-5.489A6.297 6.297 0 0020 4.985a6.462 6.462 0 016.727-.712 6.343 6.343 0 012.618 2.317c.635.998.972 2.153.972 3.33v.002zM29.707 13.812v-.203h.084v-.041h-.211v.041h.09v.203h.037zm.41 0v-.244h-.064l-.075.174-.074-.174h-.057v.244h.046v-.183l.07.158h.047l.07-.158v.184l.037-.001z"
                                    fill="#F79E1B"
                                  ></path>
                                </svg>
                                <svg
                                  width="40"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 40 24"
                                >
                                  <title>Amex</title>
                                  <rect
                                    x=".5"
                                    y=".5"
                                    width="39"
                                    height="23"
                                    rx="1.5"
                                    fill="#fff"
                                    stroke="#DADCDF"
                                  ></rect>
                                  <path
                                    d="M21.92 8.167l-.391-.885c-.12-.268-.24-.536-.357-.806-.028-.065-.067-.087-.137-.086-.71.002-1.422.002-2.134 0-.07 0-.11.018-.14.09-.128.301-.265.598-.398.897l-.36.813-.36.82-.27.61c-.115.263-.228.527-.344.79-.126.286-.255.571-.382.858-.062.141-.121.285-.182.427-.016.037-.035.073-.055.117.023.007.04.016.056.018.022.002.043 0 .065 0h1.792c.003.046.006.08.006.116v4.636c.003.047.014.058.06.064.022.003.044.002.065.002h5.79c.053 0 .098-.003.139-.053.104-.124.218-.241.328-.361l.479-.526.07-.08.146.154c.082.09.162.182.244.273l.315.345.186.209c.024.027.052.04.088.04h1.687c.068.001.073.005.074.075v2.202c0 .07-.004.073-.073.074H13.008l-.007-.065c-.002-.02 0-.038 0-.058V4.127c0-.138-.018-.127.129-.127h14.736c.145 0 .134-.012.134.13v2.188c-.001.07-.003.072-.075.073H25.871c-.085 0-.094.007-.121.083l-.208.58c-.069.194-.136.388-.207.581-.011.032-.003.074-.044.098l-.154-.428c-.039-.107-.082-.213-.12-.321-.042-.119-.08-.24-.12-.359l-.065-.19c-.009-.026-.025-.04-.052-.042-.021-.002-.043-.002-.065-.002h-2.674c-.11 0-.11 0-.11.112v1.661c-.004 0-.007.002-.01.003z"
                                    fill="#006FCF"
                                  ></path>
                                  <path
                                    d="M22.566 11.183c.005-.021.014-.043.016-.065.003-.03.001-.062.001-.094V7.14c0-.131-.004-.122.122-.122h1.542c.11 0 .11.002.147.105.074.216.151.432.227.648.056.16.112.32.17.48.095.265.19.53.287.794l.151.415c.013.036.02.073.035.109.006.015.022.026.033.038.015-.013.036-.025.043-.041.023-.06.04-.122.062-.182.067-.184.137-.368.203-.553.046-.127.084-.257.13-.385.041-.117.088-.233.13-.35.049-.132.095-.265.142-.398l.092-.255.115-.316c.04-.11.04-.11.158-.11h1.62c.003.04.007.07.007.1v4.014c-.001.068-.005.073-.075.073h-.959c-.08 0-.084-.004-.084-.087V9.709 8.424c0-.04.005-.081-.026-.122-.035.035-.045.078-.06.116l-.169.464c-.043.121-.084.243-.129.364l-.171.456c-.045.123-.085.247-.13.37-.044.122-.093.242-.137.363-.037.101-.07.204-.106.305-.05.139-.104.276-.156.414-.014.036-.038.051-.077.051h-.858c-.06 0-.068-.01-.089-.064-.037-.099-.078-.196-.114-.294-.033-.087-.062-.175-.093-.262a70.573 70.573 0 00-.47-1.285c-.052-.14-.108-.28-.16-.422-.044-.121-.082-.244-.124-.365a2.679 2.679 0 00-.07-.18c-.004-.013-.023-.026-.036-.026-.009 0-.023.02-.026.034-.004.026-.002.053-.002.08v2.663c0 .125.01.12-.123.12-.718 0-1.437 0-2.155.002-.077 0-.12-.018-.15-.096-.072-.185-.154-.366-.232-.549-.02-.048-.042-.096-.059-.145-.013-.038-.038-.053-.075-.053h-1.868c-.029.002-.047.014-.059.043-.06.154-.123.307-.186.46l-.118.283c-.018.043-.05.057-.097.057-.197-.003-.394-.001-.591-.001h-.455l-.057-.001c-.036-.005-.047-.022-.033-.055.016-.036.035-.072.052-.109.096-.213.194-.427.289-.641.087-.2.17-.4.258-.6.093-.212.188-.422.282-.634l.407-.926c.07-.161.138-.325.21-.486.061-.14.128-.279.191-.418.036-.08.072-.162.105-.243.029-.068.034-.074.105-.074h1.305c.077 0 .083.008.111.076.058.136.118.271.178.406l.2.454.425.956c.139.312.278.624.415.937.064.147.124.296.188.442.12.274.242.546.364.819.012.027.03.052.044.078a.118.118 0 01.017-.003zm-2.61-1.734h.18l.34-.001c.058-.002.066-.017.043-.072l-.173-.425-.202-.488c-.052-.126-.103-.252-.156-.377-.013-.031-.042-.034-.06-.006-.006.008-.008.017-.012.026-.05.126-.1.252-.153.377-.074.179-.15.357-.225.535l-.15.363c-.017.042-.003.062.043.067h.526zM22.585 11.837c-.036.033-.029.068-.029.1v.751c-.001.087-.002.088-.09.089h-2.278c-.048.004-.059.013-.06.062-.002.063-.001.125-.001.188v.353c0 .093.003.096.099.096H22.2l.23.001c.057 0 .064.007.065.062v.794c0 .053-.007.057-.059.06h-2.199c-.035 0-.07.005-.107.008-.002.03-.004.052-.004.073v.512c0 .09.002.092.094.092h2.22c.115 0 .114-.011.114.114l.003.802c0 .006-.003.013-.006.024h-3.538c-.002-.038-.006-.073-.006-.108v-3.364-.614c0-.022 0-.043.002-.065.001-.023.014-.035.037-.036h3.532l1.406-.001c.049 0 .085.012.119.05.118.135.24.266.362.399.092.1.185.2.276.302l.381.43c.051.057.104.113.162.175.022-.019.043-.033.06-.052l.472-.512.394-.429c.092-.1.184-.201.274-.303a.166.166 0 01.138-.06c.42.002.841.001 1.262.001h.086c-.025.032-.038.054-.056.072l-.4.414-.324.345c-.153.16-.308.316-.46.476-.165.173-.328.349-.492.523l-.196.21c-.039.043-.04.055 0 .098.063.07.13.14.196.21l.559.589.492.524.498.528c.058.063.114.127.181.203h-.079c-.432 0-.865-.001-1.297.001a.161.161 0 01-.132-.056c-.134-.15-.27-.3-.405-.448l-.379-.413a44.52 44.52 0 01-.353-.397c-.043-.049-.066-.05-.11 0l-.371.41c-.144.161-.286.323-.43.483-.114.126-.231.249-.345.375a.122.122 0 01-.099.046c-.437-.002-.875-.001-1.312-.001l-.044-.003c.01-.014.014-.024.02-.032.166-.174.331-.347.495-.522.153-.162.303-.327.454-.49l.43-.454.434-.46c.025-.026.052-.05.076-.076.044-.046.043-.07-.002-.116-.04-.04-.081-.08-.121-.123l-.446-.469-.366-.386-.49-.517-.44-.473c-.02-.024-.047-.043-.072-.065z"
                                    fill="#006FCF"
                                  ></path>
                                  <path
                                    d="M27.987 15.107l-1.11-1.185.14-.15.707-.747c.063-.066.122-.134.184-.2.024-.027.05-.05.078-.077.017.06.018 2.284.001 2.36z"
                                    fill="#006FCF"
                                  ></path>
                                </svg>
                                <svg
                                  width="40"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 40 24"
                                >
                                  <title>Discover</title>
                                  <rect
                                    x=".5"
                                    y=".5"
                                    width="39"
                                    height="23"
                                    rx="1.5"
                                    fill="#fff"
                                    stroke="#DADCDF"
                                  ></rect>
                                  <path
                                    d="M20.81 9.018c-1.404 0-2.544 1.097-2.544 2.452 0 1.44 1.09 2.516 2.544 2.516 1.419 0 2.537-1.09 2.537-2.488.001-1.39-1.11-2.48-2.537-2.48z"
                                    fill="#FA7000"
                                  ></path>
                                  <path
                                    d="M6.368 9.108H5v4.771h1.36c.723 0 1.245-.171 1.703-.551.543-.45.866-1.13.866-1.833 0-1.41-1.053-2.387-2.561-2.387zm1.088 3.583c-.296.265-.673.38-1.275.38h-.25V9.916h.25c.603 0 .965.107 1.276.385.32.287.512.73.512 1.187 0 .46-.192.918-.513 1.203zM10.285 9.108h-.927v4.771h.927V9.108zM12.563 10.937c-.56-.205-.724-.342-.724-.6 0-.3.293-.528.695-.528.278 0 .508.112.753.384l.484-.635c-.4-.352-.879-.53-1.4-.53-.845 0-1.489.588-1.489 1.365 0 .66.3.994 1.173 1.311.364.128.55.214.644.273.186.12.279.293.279.492 0 .388-.308.674-.724.674-.443 0-.801-.222-1.015-.638l-.6.581c.429.628.943.91 1.652.91.966 0 1.646-.647 1.646-1.569.001-.76-.315-1.103-1.374-1.49zM14.23 11.495c0 1.403 1.101 2.491 2.519 2.491.4 0 .742-.079 1.165-.278V12.61c-.373.375-.7.522-1.125.522-.937 0-1.6-.677-1.6-1.645 0-.913.685-1.638 1.559-1.638.441 0 .778.156 1.165.537V9.292C17.505 9.086 17.17 9 16.767 9c-1.408 0-2.537 1.108-2.537 2.495zM25.453 12.312L24.18 9.108h-1.015L25.189 14h.499l2.062-4.892h-1.007l-1.29 3.204zM28.172 13.88h2.639v-.809h-1.708v-1.288h1.643v-.808h-1.643v-1.06h1.708v-.807h-2.64v4.771zM34.496 10.516c0-.894-.613-1.409-1.688-1.409h-1.382v4.772h.933V11.96h.121l1.286 1.919h1.145l-1.5-2.012c.7-.142 1.085-.621 1.085-1.351zm-1.866.786h-.27V9.86h.285c.581 0 .893.245.893.709 0 .477-.312.734-.908.734z"
                                    fill="#444"
                                  ></path>
                                </svg>
                              </span>

                              <fieldset
                                className={`border border-solid border-gray-300 p-5 mb-5 max-w-md ${
                                  cardError ? "border-red-500" : ""
                                }`}
                              >
                                <CardElement
                                  options={{
                                    iconStyle: "solid",
                                    style: {
                                      base: {
                                        iconColor: "black",
                                        color: "black",
                                        fontWeight: 500,
                                        fontFamily:
                                          "Roboto, Open Sans, Segoe UI, sans-serif",
                                        fontSize: "16px",
                                        fontSmoothing: "antialiased",
                                        ":-webkit-autofill": {
                                          color: "black",
                                        },
                                        "::placeholder": {
                                          color: "#2b2b2b9c",
                                          // backgroundColor: "#2b2b2b9c",
                                        },
                                      },
                                      invalid: {
                                        iconColor: "#ef253c",
                                        color: "#ef253c",
                                      },
                                    },
                                    hidePostalCode: true,
                                  }}
                                  onChange={(e: any) => {
                                    setCardError(e.error);
                                    setCardComplete(e.complete);
                                  }}
                                  className="text-zinc-800"
                                />
                              </fieldset>

                              {cardError && (
                                <span className="text-sm text-primary">
                                  {cardError.message}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </div>

                        <div className="flex items-center my-5">
                          <RadioGroupItem value="PAYPAL" id="paypal" />

                          <Label
                            htmlFor="paypal"
                            className="cursor-pointer ml-2 text-[18px] w-full"
                          >
                            <svg
                              width="161"
                              height="26"
                              viewBox="0 0 161 26"
                              fill="none"
                            >
                              <title>PayPal, PayPal Credit</title>
                              <path
                                d="M118.616 7.96772C118.849 6.39562 118.614 5.32568 117.809 4.3568C116.922 3.2901 115.321 2.83301 113.272 2.83301H107.324C106.905 2.83301 106.548 3.1548 106.483 3.59162L104.006 20.1778C103.957 20.5049 104.197 20.8009 104.511 20.8009H108.183L107.929 22.4982C107.886 22.7845 108.096 23.0433 108.37 23.0433H111.465C111.832 23.0433 112.143 22.762 112.201 22.3797L112.231 22.2135L112.814 18.309L112.852 18.0934C112.909 17.7112 113.221 17.4295 113.587 17.4295H114.05C117.048 17.4295 119.396 16.1432 120.082 12.4226C120.369 10.8679 120.221 9.57026 119.463 8.65793C119.233 8.38196 118.948 8.15383 118.616 7.96772Z"
                                fill="#009CDE"
                              ></path>
                              <path
                                d="M118.616 7.96772C118.849 6.39562 118.614 5.32568 117.809 4.3568C116.922 3.2901 115.321 2.83301 113.272 2.83301H107.324C106.905 2.83301 106.548 3.1548 106.483 3.59162L104.006 20.1778C103.957 20.5049 104.197 20.8009 104.511 20.8009H108.183L109.105 14.624L109.076 14.8178C109.142 14.3808 109.495 14.0592 109.914 14.0592H111.659C115.087 14.0592 117.77 12.5886 118.555 8.33559C118.578 8.20973 118.598 8.08756 118.616 7.96772Z"
                                fill="#012169"
                              ></path>
                              <path
                                d="M110.096 7.98854C110.135 7.72589 110.295 7.51081 110.51 7.40188C110.608 7.35246 110.717 7.32497 110.831 7.32497H115.494C116.046 7.32497 116.561 7.36301 117.032 7.44316C117.167 7.46611 117.298 7.4923 117.425 7.52219C117.552 7.5519 117.675 7.5854 117.795 7.62224C117.855 7.64065 117.914 7.6599 117.971 7.68017C118.203 7.76124 118.418 7.85684 118.616 7.96772C118.849 6.39562 118.614 5.32568 117.809 4.3568C116.922 3.2901 115.321 2.83301 113.272 2.83301H107.324C106.905 2.83301 106.549 3.1548 106.483 3.59162L104.007 20.1778C103.958 20.5049 104.197 20.8009 104.511 20.8009H108.183L109.105 14.624L110.096 7.98854Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M144.153 13.2199C144.177 13.0606 144.307 12.9435 144.46 12.9435H147.329C149.696 12.9435 151.353 14.908 150.981 17.432C150.598 19.9565 148.343 21.921 145.987 21.921H143.065C142.953 21.921 142.869 21.8159 142.886 21.7001L144.153 13.2199ZM145.356 19.9445H145.852C147.171 19.9445 148.411 19.1825 148.681 17.4321C148.918 15.825 148.05 14.9199 146.63 14.9199H146.266C146.176 14.9199 146.101 14.9882 146.087 15.0811L145.356 19.9445Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M140.438 15.1961L140.254 16.4201H142.534C142.645 16.4201 142.73 16.5249 142.712 16.6408L142.493 18.1199C142.469 18.2791 142.339 18.3965 142.187 18.3965H140.225C140.072 18.3965 139.943 18.5132 139.918 18.672L139.724 19.9445H142.139C142.25 19.9445 142.335 20.0493 142.318 20.1652L142.099 21.644C142.075 21.8035 141.945 21.921 141.792 21.921H137.433C137.322 21.921 137.237 21.8159 137.254 21.7001L138.521 13.2199C138.545 13.0606 138.675 12.9435 138.828 12.9435H143.188C143.299 12.9435 143.383 13.0483 143.366 13.1641L143.147 14.6432C143.123 14.8025 142.993 14.9198 142.841 14.9198H140.744C140.591 14.9199 140.462 15.0371 140.438 15.1961Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M152.91 21.921H151.178C151.066 21.921 150.982 21.8159 150.999 21.7001L152.266 13.2199C152.29 13.0606 152.42 12.9435 152.573 12.9435H154.305C154.417 12.9435 154.501 13.0484 154.484 13.1643L153.217 21.6445C153.193 21.8037 153.063 21.921 152.91 21.921Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M136.65 21.921H134.379C134.283 21.921 134.195 21.8625 134.153 21.7705L132.654 18.4679H132.632L132.147 21.6972C132.127 21.8261 132.022 21.921 131.899 21.921H130.115C130.004 21.921 129.919 21.8159 129.936 21.7001L131.211 13.1672C131.231 13.0383 131.336 12.9435 131.459 12.9435H134.548C136.228 12.9435 137.378 13.7888 137.096 15.7058C136.904 16.9441 136.093 18.0156 134.852 18.2419L136.805 21.6306C136.878 21.7577 136.791 21.921 136.65 21.921ZM132.857 16.9678H133.071C133.793 16.9678 134.623 16.8244 134.774 15.8486C134.924 14.8726 134.443 14.7323 133.672 14.7295H133.359C133.265 14.7295 133.184 14.8018 133.169 14.9002L132.857 16.9678Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M157.598 21.921H155.865C155.754 21.921 155.669 21.8159 155.686 21.7001L156.701 14.9198H155.087C154.975 14.9198 154.891 14.8152 154.908 14.6992L155.127 13.2203C155.151 13.0608 155.281 12.9435 155.434 12.9435H160.819C160.93 12.9435 161.015 13.0483 160.998 13.1641L160.778 14.6432C160.755 14.8025 160.625 14.9198 160.472 14.9198H158.911L157.904 21.6444C157.88 21.8037 157.75 21.921 157.598 21.921Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M130.049 15.4947C130.024 15.6612 129.831 15.7212 129.719 15.6004C129.341 15.1907 128.785 14.9742 128.187 14.9742C126.835 14.9742 125.765 16.0685 125.551 17.4602C125.348 18.8759 126.114 19.8988 127.489 19.8988C128.055 19.8988 128.656 19.6712 129.156 19.2909C129.293 19.1856 129.483 19.3114 129.456 19.4889L129.141 21.543C129.122 21.6651 129.038 21.7653 128.926 21.8002C128.253 22.0088 127.736 22.1593 127.106 22.1593C123.441 22.1593 122.855 18.8533 123.044 17.4482C123.574 13.5079 126.601 12.6053 128.457 12.7139C129.055 12.7491 129.591 12.833 130.116 13.0413C130.285 13.1086 130.386 13.2932 130.357 13.4819L130.049 15.4947Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M141.056 3.95593H139.142C139.011 3.95593 138.899 4.05644 138.879 4.19304L138.105 9.37634C138.09 9.4786 138.165 9.57106 138.263 9.57106H139.245C139.337 9.57106 139.414 9.50081 139.429 9.40521L139.648 7.93565C139.669 7.79905 139.78 7.69845 139.911 7.69845H140.517C141.778 7.69845 142.505 7.05414 142.695 5.77699C142.781 5.21856 142.699 4.7796 142.451 4.47225C142.179 4.13455 141.696 3.95593 141.056 3.95593ZM141.277 5.84908C141.172 6.57465 140.647 6.57465 140.14 6.57465H139.851L140.054 5.21976C140.066 5.13785 140.133 5.0777 140.211 5.0777H140.344C140.689 5.0777 141.016 5.0777 141.184 5.28547C141.285 5.41004 141.315 5.59421 141.277 5.84908Z"
                                fill="#009CDE"
                              ></path>
                              <path
                                d="M127.403 3.95689H125.489C125.358 3.95689 125.247 4.0574 125.226 4.194L124.452 9.3773C124.437 9.47956 124.512 9.57202 124.61 9.57202H125.524C125.655 9.57202 125.766 9.47151 125.787 9.33491L125.996 7.93661C126.016 7.80001 126.127 7.69941 126.258 7.69941H126.864C128.125 7.69941 128.853 7.0551 129.043 5.77795C129.128 5.21952 129.046 4.78057 128.799 4.47322C128.526 4.13551 128.044 3.95689 127.403 3.95689ZM127.624 5.85004C127.52 6.57561 126.995 6.57561 126.487 6.57561H126.199L126.401 5.22072C126.413 5.13882 126.48 5.07866 126.559 5.07866H126.691C127.037 5.07866 127.363 5.07866 127.531 5.28643C127.632 5.411 127.662 5.59517 127.624 5.85004Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M133.125 5.82561H132.208C132.13 5.82561 132.063 5.88595 132.051 5.96804L132.01 6.23855L131.946 6.14045C131.748 5.83625 131.305 5.73463 130.864 5.73463C129.851 5.73463 128.986 6.54498 128.817 7.68155C128.73 8.24859 128.854 8.79036 129.159 9.1686C129.438 9.51621 129.838 9.66058 130.313 9.66058C131.129 9.66058 131.582 9.10696 131.582 9.10696L131.541 9.376C131.526 9.47817 131.601 9.57081 131.699 9.57081H132.524C132.655 9.57081 132.766 9.4704 132.787 9.3337L133.282 6.02023C133.298 5.91806 133.223 5.82561 133.125 5.82561ZM131.847 7.70978C131.759 8.26284 131.343 8.63405 130.813 8.63405C130.547 8.63405 130.334 8.54372 130.197 8.37279C130.062 8.20333 130.011 7.96178 130.054 7.69284C130.136 7.14459 130.559 6.76145 131.081 6.76145C131.341 6.76145 131.553 6.85261 131.692 7.02521C131.832 7.19901 131.888 7.44222 131.847 7.70978Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M146.778 5.82561H145.861C145.783 5.82561 145.716 5.88595 145.703 5.96804L145.663 6.23855L145.599 6.14045C145.401 5.83625 144.958 5.73463 144.516 5.73463C143.504 5.73463 142.639 6.54498 142.47 7.68155C142.383 8.24859 142.507 8.79036 142.812 9.1686C143.091 9.51621 143.49 9.66058 143.966 9.66058C144.782 9.66058 145.235 9.10696 145.235 9.10696L145.194 9.376C145.179 9.47817 145.254 9.57081 145.352 9.57081H146.177C146.308 9.57081 146.419 9.4704 146.44 9.3337L146.935 6.02023C146.95 5.91806 146.876 5.82561 146.778 5.82561ZM145.5 7.70978C145.412 8.26284 144.996 8.63405 144.466 8.63405C144.2 8.63405 143.987 8.54372 143.85 8.37279C143.715 8.20333 143.663 7.96178 143.707 7.69284C143.789 7.14459 144.212 6.76145 144.734 6.76145C144.994 6.76145 145.205 6.85261 145.345 7.02521C145.485 7.19901 145.54 7.44222 145.5 7.70978Z"
                                fill="#009CDE"
                              ></path>
                              <path
                                d="M138.007 5.82561H137.085C136.997 5.82561 136.915 5.87188 136.865 5.94879L135.594 7.92541L135.056 6.02606C135.022 5.90723 134.918 5.82561 134.801 5.82561H133.895C133.786 5.82561 133.709 5.93935 133.744 6.04855L134.759 9.19312L133.804 10.6149C133.73 10.7265 133.805 10.8808 133.935 10.8808H134.855C134.942 10.8808 135.024 10.8357 135.074 10.7599L138.137 6.0902C138.211 5.9785 138.135 5.82561 138.007 5.82561Z"
                                fill="#003087"
                              ></path>
                              <path
                                d="M147.858 4.09812L147.072 9.37619C147.057 9.47855 147.132 9.57091 147.23 9.57091H148.02C148.151 9.57091 148.262 9.4704 148.283 9.3338L149.057 4.15041C149.073 4.04824 148.998 3.95569 148.9 3.95569H148.016C147.937 3.95587 147.87 4.01621 147.858 4.09812Z"
                                fill="#009CDE"
                              ></path>
                              <line
                                x1="88.5"
                                y1="2.18557e-08"
                                x2="88.5"
                                y2="26"
                                stroke="#DADCDF"
                              ></line>
                              <path
                                d="M13.5192 6.03498C12.6862 5.10708 11.1805 4.70927 9.2544 4.70927H3.66406C3.26998 4.70927 2.93511 4.98939 2.87341 5.36921L0.545715 19.7978C0.49944 20.0823 0.724845 20.3401 1.01991 20.3401H4.47114L5.33793 14.9667L5.31106 15.135C5.37276 14.7552 5.70515 14.4751 6.09874 14.4751H7.73877C10.9606 14.4751 13.4834 13.196 14.2203 9.49612C14.2422 9.3867 14.2611 9.2802 14.2775 9.17613C14.1844 9.12798 14.1844 9.12798 14.2775 9.17613C14.4969 7.80859 14.2759 6.87778 13.5192 6.03498"
                                fill="#003087"
                              ></path>
                              <path
                                d="M49.1763 12.8577H47.3189C47.1412 12.8577 46.975 12.9438 46.8755 13.0878L44.313 16.776L43.2272 13.2317C43.1591 13.0099 42.9501 12.8577 42.7132 12.8577H40.8876C40.6672 12.8577 40.5119 13.0698 40.5831 13.2735L42.6282 19.1415L40.7045 21.7943C40.5537 22.0025 40.7061 22.2904 40.9672 22.2904H42.8227C42.9984 22.2904 43.1631 22.2063 43.2636 22.0652L49.4406 13.3513C49.5883 13.1427 49.4361 12.8577 49.1763 12.8577V12.8577ZM36.7583 16.3733C36.5797 17.4053 35.7418 18.0983 34.6725 18.0983C34.1366 18.0983 33.7071 17.9295 33.4315 17.6105C33.1583 17.2944 33.0553 16.8436 33.1419 16.3422C33.3081 15.3189 34.1599 14.6041 35.2128 14.6041C35.7378 14.6041 36.1637 14.7743 36.4448 15.0962C36.728 15.4206 36.8394 15.8738 36.7583 16.3733V16.3733ZM39.3338 12.8577H37.4858C37.3276 12.8577 37.1927 12.97 37.1678 13.1232L37.0867 13.628L36.9579 13.4451C36.5573 12.8776 35.6651 12.6875 34.7745 12.6875C32.7329 12.6875 30.9889 14.1999 30.6495 16.3208C30.4729 17.379 30.7236 18.3901 31.3377 19.0957C31.9014 19.744 32.706 20.0139 33.6649 20.0139C35.3109 20.0139 36.2234 18.9809 36.2234 18.9809L36.1408 19.4828C36.11 19.6735 36.2607 19.8461 36.4588 19.8461H38.1227C38.3869 19.8461 38.6113 19.6589 38.6526 19.404L39.6518 13.221C39.6826 13.0303 39.5313 12.8577 39.3338 12.8577V12.8577ZM28.244 12.9011C28.0331 14.255 26.9752 14.255 25.9517 14.255H25.3695L25.778 11.7271C25.8024 11.5744 25.9372 11.462 26.0955 11.462H26.3627C27.0593 11.462 27.7171 11.462 28.0565 11.8496C28.2595 12.0816 28.3207 12.4259 28.244 12.9011V12.9011ZM27.7987 9.36842H23.9395C23.6752 9.36842 23.4508 9.55614 23.4095 9.81097L21.8491 19.4829C21.8183 19.6735 21.969 19.8462 22.1666 19.8462H24.0096C24.2733 19.8462 24.4977 19.6585 24.539 19.4041L24.9605 16.7945C25.0013 16.5397 25.2262 16.352 25.4899 16.352H26.711C29.2531 16.352 30.7205 15.1498 31.1036 12.7663C31.2763 11.7246 31.1106 10.9057 30.6115 10.3323C30.0627 9.70204 29.0899 9.36842 27.7987 9.36842"
                                fill="#002F86"
                              ></path>
                              <path
                                d="M69.0381 9.6342L67.4543 19.4832C67.4234 19.6738 67.5742 19.8464 67.7717 19.8464H69.365C69.6287 19.8464 69.8536 19.6587 69.8944 19.4039L71.4563 9.73195C71.4872 9.54131 71.3364 9.36867 71.1384 9.36867H69.356C69.1973 9.36867 69.0625 9.48101 69.0381 9.6342V9.6342ZM64.2845 16.3733C64.1059 17.4053 63.2679 18.0983 62.1986 18.0983C61.6627 18.0983 61.2333 17.9295 60.9576 17.6105C60.684 17.2944 60.5815 16.8436 60.6681 16.3422C60.8343 15.3189 61.6861 14.604 62.739 14.604C63.2639 14.604 63.6899 14.7743 63.971 15.0962C64.2541 15.4206 64.3656 15.8738 64.2845 16.3733V16.3733ZM66.86 12.8577H65.0119C64.8537 12.8577 64.7189 12.97 64.694 13.1232L64.6129 13.628L64.4835 13.4451C64.0835 12.8776 63.1913 12.6875 62.3006 12.6875C60.259 12.6875 58.515 14.1999 58.1757 16.3208C57.999 17.379 58.2498 18.3901 58.8638 19.0957C59.4276 19.744 60.2322 20.0139 61.191 20.0139C62.837 20.0139 63.7496 18.9809 63.7496 18.9809L63.667 19.4828C63.6361 19.6735 63.7869 19.8461 63.9849 19.8461H65.6489C65.9131 19.8461 66.1375 19.6589 66.1788 19.404L67.1779 13.221C67.2088 13.0303 67.0575 12.8577 66.86 12.8577V12.8577ZM55.7702 12.9011C55.5592 14.255 54.5013 14.255 53.4778 14.255H52.8956L53.3041 11.7271C53.3285 11.5744 53.4634 11.462 53.6216 11.462H53.8888C54.5854 11.462 55.2432 11.462 55.5826 11.8496C55.7856 12.0816 55.8468 12.4259 55.7702 12.9011V12.9011ZM55.3248 9.36842H51.4656C51.2014 9.36842 50.9769 9.55614 50.9356 9.81097L49.3752 19.4829C49.3444 19.6735 49.4956 19.8462 49.6927 19.8462H51.6731C51.8577 19.8462 52.0149 19.7149 52.0438 19.5369L52.4866 16.7945C52.5274 16.5397 52.7523 16.352 53.016 16.352H54.2371C56.7793 16.352 58.2466 15.1498 58.6298 12.7663C58.8024 11.7246 58.6367 10.9057 58.1377 10.3323C57.5888 9.70204 56.616 9.36842 55.3248 9.36842"
                                fill="#009CDE"
                              ></path>
                              <path
                                d="M13.5192 6.03498C12.6862 5.10708 11.1805 4.70927 9.2544 4.70927H3.66406C3.26998 4.70927 2.93511 4.98939 2.87341 5.36921L0.545715 19.7978C0.49944 20.0823 0.724845 20.3401 1.01991 20.3401H4.47114L5.33793 14.9667L5.31106 15.135C5.37276 14.7552 5.70515 14.4751 6.09874 14.4751H7.73877C10.9606 14.4751 13.4834 13.196 14.2203 9.49612C14.2422 9.3867 14.2611 9.2802 14.2775 9.17613C14.1844 9.12798 14.1844 9.12798 14.2775 9.17613C14.4969 7.80859 14.2759 6.87778 13.5192 6.03498"
                                fill="#003087"
                              ></path>
                              <path
                                d="M6.26947 9.19427C6.30629 8.9657 6.45656 8.77847 6.65858 8.68364C6.75063 8.64084 6.85313 8.61701 6.96061 8.61701H11.3433C11.8623 8.61701 12.3464 8.65008 12.7888 8.71962C12.9157 8.73954 13.0386 8.76242 13.158 8.78868C13.2774 8.81444 13.3934 8.84364 13.5058 8.87573C13.562 8.89176 13.6173 8.90834 13.6715 8.92582C13.8889 8.99683 14.0915 9.0795 14.2776 9.17628C14.497 7.80826 14.276 6.87793 13.5192 6.03514C12.6858 5.10724 11.1806 4.70943 9.25446 4.70943H3.66363C3.27004 4.70943 2.93517 4.98955 2.87347 5.36936L0.545777 19.7975C0.499502 20.0825 0.724907 20.3398 1.01948 20.3398H4.47121L5.33799 14.9664L6.26947 9.19427V9.19427Z"
                                fill="#002F86"
                              ></path>
                              <path
                                d="M14.2776 9.17613C14.2607 9.28069 14.2423 9.38671 14.2204 9.49613C13.4835 13.1956 10.9607 14.4751 7.73887 14.4751H6.09834C5.70476 14.4751 5.37237 14.7552 5.31117 15.135L4.47125 20.3396L4.23291 21.8161C4.1926 22.0651 4.38965 22.2907 4.64739 22.2907H7.55676C7.90109 22.2907 8.19416 22.0456 8.2479 21.7135L8.27628 21.5685L8.82462 18.1721L8.85997 17.9844C8.91371 17.6522 9.20678 17.4071 9.55111 17.4071H9.98649C12.8048 17.4071 15.0116 16.2881 15.6564 13.0516C15.9256 11.6992 15.7863 10.5699 15.0743 9.77674C14.8583 9.5365 14.5901 9.33808 14.2776 9.17613"
                                fill="#009CDE"
                              ></path>
                              <path
                                d="M13.506 8.87553C13.3935 8.84343 13.2776 8.81425 13.1582 8.78848C13.0387 8.76268 12.9153 8.73985 12.7889 8.71991C12.3461 8.64988 11.8625 8.61681 11.343 8.61681H6.96077C6.85279 8.61681 6.75029 8.64066 6.65873 8.68392C6.45622 8.77875 6.30644 8.9655 6.26962 9.19455L5.33815 14.9667L5.31128 15.135C5.37248 14.7551 5.70487 14.475 6.09845 14.475H7.73898C10.9608 14.475 13.4836 13.196 14.2205 9.49607C14.2424 9.38665 14.2608 9.28063 14.2777 9.17607C14.0911 9.07978 13.8891 8.99662 13.6717 8.92611C13.6174 8.9086 13.5622 8.89156 13.506 8.87553"
                                fill="#012069"
                              ></path>
                            </svg>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  )}
                />
              </section>

              <div className="hidden md:flex lg:flex justify-between gap-3">
                <Button
                  className="w-2/5 h-12 text-base flex items-center gap-x-2 disabled:opacity-100"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={processing}
                >
                  {processing ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <>
                      <LockKeyhole />
                      Place Order
                    </>
                  )}
                </Button>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex justify-center gap-x-2">
                      <Truck size={20} strokeWidth={1} />
                      <p className="text-sm">Shipping costs included!</p>
                    </div>

                    <p className="text-sm">
                      Total: <b>{formatPrice(cart?.totalAmount)}</b>
                    </p>
                  </div>
                  <p className="text-xs">
                    By submitting your order, you agree to our
                    <Link href="/terms-and-conditions" className="underline">
                      &nbsp;terms and conditions
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-2.5">
          <fieldset className="border border-solid border-gray-300 mb-5 px-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="promo-code">
                <AccordionTrigger className="hover:no-underline font-bold flex items-center justify-start">
                  <Plus className="mr-2" /> Add a promo code
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 1 } }}
                  >
                    <CouponCodeForm />
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </fieldset>
          <fieldset className="border border-solid border-gray-300 p-5">
            {/* Order Summary */}
            <section className="mb-5 space-y-3">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold">({cart.totalQty}) Item:</h5>
                <h5 className="text-sm font-bold tracking-wider">
                  {formatPrice(cart.subTotal)}
                </h5>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Sale Savings:</p>
                <p className="text-sm text-red-500 tracking-wider">
                  {formatPrice(0)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h5 className="font-bold">Subtotal:</h5>

                <h5 className="font-bold tracking-wider">
                  {formatPrice(cart.subTotal)}
                </h5>
              </div>
              <Separator />

              <div className="flex items-center justify-between">
                <h5 className="text-sm">Shipping:</h5>
                {cart.totalShippingPrice ? (
                  <h5 className="text-sm tracking-wider">
                    {formatPrice(cart.totalShippingPrice)}
                  </h5>
                ) : (
                  <p className="font-bold">Free</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <h5 className="text-sm flex items-center gap-x-1">
                  Estimated Tax:
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={15} className="cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-zinc-900 text-white max-w-[250px]">
                        <p>
                          Final tax amount will be shown upon order completion.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h5>
                <h5 className="text-sm tracking-wider">
                  {formatPrice(cart.tax)}
                </h5>
              </div>

              <div className="flex items-center justify-between">
                <h5 className="text-lg font-bold">Total:</h5>
                <h5 className="text-lg font-bold tracking-wider">
                  {formatPrice(cart.totalAmount)}
                </h5>
              </div>
            </section>
            <Button
              className="w-full h-12 text-base flex items-center gap-x-2 disabled:opacity-100"
              onClick={form.handleSubmit(onSubmit)}
              disabled={processing}
            >
              {processing ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <>
                  <LockKeyhole />
                  Place Order
                </>
              )}
            </Button>
            {cart.totalShippingPrice <= 0 && (
              <div className="flex items-center mt-3 justify-center">
                <Truck size={20} strokeWidth={1} />
                <p className="text-sm">This Order Ships Free!</p>
              </div>
            )}
          </fieldset>
        </div>
      </div>

      {/* Scroll to top */}
      <div className="mt-10">
        <ScrollToTopButton />
      </div>
    </>
  );
}
