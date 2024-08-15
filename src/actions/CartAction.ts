"use server";

import { extApi } from "@/lib/api";
import { Cart } from "@/types/cartProduct";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type params = {
  productId: string;
  qty?: number;
};

async function createCartSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    try {
      const res = await extApi.post("/cart");

      // Set token in the cookie
      const setCookieHdr = res?.headers["set-cookie"];

      if (setCookieHdr) {
        // Handle the case where setCookieHdr might be an array
        const cookiesHdr = Array.isArray(setCookieHdr)
          ? setCookieHdr
          : [setCookieHdr];

        const sid = cookiesHdr[0].split(";")[0].split("=")[1];

        cookies().set({
          name: "session",
          value: sid,
          secure: true,
          httpOnly: true,
        });
      }
    } catch (e) {
      console.log(e);
      return "Error creating cart";
    }
  }
  return;
}

export const addOrUpdateItem = async (productId: string, qty: number = 1) => {
  let session = cookies().get("session")?.value;
  let cart;

  if (!productId) {
    return "Missing product ID";
  }

  // if (session) {
  //   const res = await extApi.get("/cart", {
  //     headers: { cookie: `session=${session}` },
  //   });
  //   cart = res.data;
  // }

  if (!session || !cart) {
    // Create a new cart session
    await createCartSession();
    // update the session variable
    session = cookies().get("session")?.value;
  }

  try {
    const res = await extApi.post(
      "/cart/update",
      {
        productId,
        qty: JSON.stringify(qty),
        stateCode: "AR", //TODO: Store this in state get from the state
      },
      {
        headers: { cookie: `session=${session}` },
      }
    );

    cart = res.data;
    revalidateTag("cart");
    return cart;
  } catch (e) {
    console.log(e);
    return "Error adding item to cart";
  }
};

export const removeItem = async (productId: string): Promise<any> => {
  const session = cookies().get("session")?.value;

  if (!session) {
    return "Missing cart session";
  }
  try {
    await extApi.delete(`/cart/${productId}`, {
      headers: { cookie: `session=${session}` },
    });
    revalidateTag("cart");
    return;
  } catch (e) {
    console.log(e);
    return "Error removing item from cart";
  }
};

export const getCart = async (): Promise<Cart | undefined> => {
  const session = cookies().get("session")?.value;
  if (!session) return;

  try {
    const res = await extApi.get("/cart", {
      headers: { cookie: `session=${session}` },
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};
