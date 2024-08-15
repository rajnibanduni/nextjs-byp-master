import Logo from "@/components/Logo";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { SITE_METADATA } from "@/constants";
import Link from "next/link";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <section className="py-5 shadow-md">
        <MaxWidthWrapper className="flex items-center justify-between">
          <Logo height={70} width={70} />

          <h1 className="font-bold text-xl">Checkout</h1>
        </MaxWidthWrapper>
      </section>

      <section className="my-10">{children}</section>

      {/* Footer */}

      <section className="text-sm bg-zinc-900 text-gray-50 py-5 lg:py-10">
        <MaxWidthWrapper>
          {/* Copyright / Card Brands */}
          <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center space-y-5 gap-5">
            <div>
              <span className="text-xs mx-auto">
                Copyright {new Date().getFullYear()} &copy;{" "}
                <Link href="/" className="hover:underline ">
                  {SITE_METADATA.name}
                </Link>
                . All rights reserved.
              </span>
            </div>
            <div>
              <ul className="flex items-center space-x-5">
                <li>
                  <Link href={"#"} className="hover:underline">
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link href={"#"} className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href={"#"} className="hover:underline">
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
