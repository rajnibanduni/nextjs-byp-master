import { US_STATES } from "@/constants";
import * as z from "zod";

// const addressSchema = z.object({
//   firstName: z.string().min(1).max(40),
//   lastName: z.string().min(1).max(40),
//   billingCompanyName: z.string().min(1).max(70).optional(),
//   billingPhone: z.string().min(10).max(10).optional(),
//   billingStreetAddress: z.string().min(1).max(100),
//   billinCity: z.string().min(1).max(70),
//   billingState: z.string().min(1),
//   billingZipCode: z.string().min(5).max(10),
//   billingCountry: z.string().min(1).max(20),
// });

export const checkoutFormSchema = z
  .object({
    sessionId: z.string().optional(),
    paymentId: z.string().optional(),
    paymentMethod: z.enum(["CARD", "PAYPAL"]),
    email: z.string().email("Invalid email").optional(),
    billingFirstName: z
      .string()
      .min(1, "First name is required")
      .max(40, "First name must not be greater than 40 characters"),
    billingLastName: z
      .string()
      .min(1, "Last name is required")
      .max(40, "Last name must not be greater than 40 characters"),
    billingCompanyName: z
      .string()
      .max(70, "Company name must not be grater than 70 characters")
      .optional(),
    billingPhone: z
      .string()
      .max(12, "Phone must be not greater than 10 digits")
      .optional(),
    billingStreetAddress: z
      .string()
      .min(1, "Street address is required")
      .max(100, "Street address must not be greater than 100 characters"),
    billingCity: z
      .string()
      .min(1, "City name is required")
      .max(70, "City name must not be greater than 70 characters"),

    // @ts-ignore
    billingState: z.enum(US_STATES.map((state) => state.value) as const, {
      message: "Please select a US state",
    }),
    billingZipCode: z
      .string()
      .min(1, "Zip code is required")
      .max(5, "Zip code must not be greater than 5 digits"),
    billingCountry: z.string().min(1, "Please select country").max(20),
    shippingSameAsBilling: z.boolean(),
    shippingFirstName: z
      .string()
      .min(1, "First name is required")
      .max(40, "First name must not be greater than 40 characters"),
    shippingLastName: z
      .string()
      .min(1, "Last name is required")
      .max(40, "Last name must not be greater than 40 characters"),
    shippingCompanyName: z
      .string()
      .max(70, "Company name must not be grater than 70 characters")
      .optional(),
    shippingPhone: z
      .string()
      .max(12, "Phone must be not greater than 10 digits")
      .optional(),
    shippingStreetAddress: z
      .string()
      .min(1, "Street address is required")
      .max(100, "Street address must not be greater than 100 characters"),
    shippingCity: z
      .string()
      .min(1, "City name is required")
      .max(70, "City name must not be greater than 70 characters"),
    // @ts-ignore
    shippingState: z.enum(US_STATES.map((state) => state.value) as const, {
      message: "Please select a US state",
    }),
    shippingZipCode: z
      .string()
      .min(1, "Please enter a zip code")
      .max(5, "Zip code must not be greater than 5 digits"),
    shippingCountry: z.string().min(1, "Please select country").max(20),
  })
  .superRefine((data, ctx) => {
    if (!data.shippingSameAsBilling) {
      if (!data.shippingFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "First name is required",
          path: ["shippingFirstName"],
        });
      }
      if (!data.shippingLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last name is required",
          path: ["shippingLastName"],
        });
      }
      if (!data.shippingStreetAddress) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Street address is required",
          path: ["shippingStreetAddress"],
        });
      }
      if (!data.shippingCity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City name is required",
          path: ["shippingCity"],
        });
      }
      if (!data.shippingState) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select state",
          path: ["shippingState"],
        });
      }
      if (!data.shippingZipCode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a zip code",
          path: ["shippingZipCode"],
        });
      }
      if (!data.shippingCountry) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select country",
          path: ["shippingCountry"],
        });
      }
    }
  });

export type checkoutFormType = z.infer<typeof checkoutFormSchema>;

export const promoCodeForm = z.object({
  promoCode: z
    .string()
    .min(1, "Promo code must not be empty")
    .max(20, "Promo code must not be greater than 20 characters"),
});

export type promoCodeType = z.infer<typeof promoCodeForm>;
