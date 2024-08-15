"use server";
import { extApi } from "@/lib/api";
import { cookies } from "next/headers";
import { getUserAction } from "./AuthAction";
import { Order } from "@/types/order";
import { error } from "console";

export const getPaymentStatus = async ({
  orderId,
}: {
  orderId: string;
}): Promise<Order | any> => {
  const user = await getUserAction();
  if (!user) return { error: "Unauthorized", errorCode: 401 };

  try {
    const { data } = await extApi.get(`/orders/${orderId}`, {
      headers: {
        cookie: `session=${cookies().get("session")?.value}`,
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
      },
    });

    if (data.isPaid) {
      return data as Order;
    } else {
      return false;
    }
  } catch (e: any) {
    console.log(e);
    return { error: e.message, errorCode: e.status };
  }
};
