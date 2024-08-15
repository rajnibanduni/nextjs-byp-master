"use server";
import { extApi } from "@/lib/api";
import ac from "@/lib/safe-action";
import { checkoutFormSchema, checkoutFormType } from "@/types/checkoutSchema";
import { cookies } from "next/headers";

export async function createCheckoutSession(): Promise<any> {
  let session = cookies().get("session")?.value;

  if (!session) return { error: "No session found" };

  try {
    const { data } = await extApi.post(
      "/checkout/create-session",
      {},
      {
        headers: {
          cookie: `session=${session}`,
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      }
    );
    const payload = {
      sessionId: data.sessionId,
      clientSecret: data.clientSecret,
      cart: data.cart,
      paymentId: data.intentId,
    };
    return payload;
  } catch (e: any) {
    console.log(e);
    return { error: e.message };
  }
}

export async function validateCheckoutSession(sessionId: string) {
  let session = cookies().get("session")?.value;

  if (!session) return { error: "No session found" };

  try {
    const { data } = await extApi.post(
      `/checkout/validate-session?sessionId=${sessionId}`,
      {},
      {
        headers: { cookie: `session=${session}` },
      }
    );
    return {
      client_secret: data.client_secret,
      cart: data.cart,
      paymentId: data.intentId,
    };
  } catch (e: any) {
    console.log(e);
    return { error: e.message };
  }
}

export const createOrder = ac(
  checkoutFormSchema,
  async (inputs: checkoutFormType) => {
    let session = cookies().get("session")?.value;

    if (!session) return { error: "No session found" };

    try {
      const { data } = await extApi.post(
        "/orders",
        {
          // paymentId: inputs.paymentId?.toString(),
          paymentMethod: inputs.paymentMethod,
          sessionId: inputs.sessionId,
          billingAddress: {
            firstName: inputs.billingFirstName,
            lastName: inputs.billingLastName,
            companyName: inputs.billingCompanyName,

            streetAddress: inputs.billingStreetAddress,
            city: inputs.billingCity,
            state: inputs.billingState,
            zipCode: inputs.billingZipCode,
            country: inputs.billingCountry,
          },
          billingPhone: inputs.billingPhone,
          shippingAddress: {
            firstName: inputs.shippingFirstName,
            lastName: inputs.shippingLastName,
            companyName: inputs.shippingCompanyName,
            streetAddress: inputs.shippingStreetAddress,
            city: inputs.shippingCity,
            state: inputs.shippingState,
            zipCode: inputs.shippingZipCode,
            country: inputs.shippingCountry,
          },
          shippingPhone: inputs.shippingPhone,
        },
        {
          headers: {
            cookie: `session=${session}`,
            Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
          },
        }
      );

      return data;
    } catch (e: any) {
      console.log(e);
      if (e.status === 401) {
        return { error: "Unauthorized" };
      }
      if (e.status === 400) {
        return { error: e };
      }
    }
  }
);
