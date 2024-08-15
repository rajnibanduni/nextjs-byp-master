import { extApi } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams;
  let currPage;
  let nxtPage = undefined;
  let limit = 50;
  try {
    // Filter params
    const qry = url.get("q");
    const filter = url.get("filter");
    const slug = url.get("slug");

    // Get single product by slug
    if (slug) {
      return Response.json((await extApi.get(`/products/${slug}`)).data);
    }

    const response = await extApi.get(`/products?limit=${limit}`);
    return Response.json(response.data);
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
}
