import { Suspense } from "react";
import ThankYou from "./ThankYou";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Logo from "@/components/Logo";
import Link from "next/link";
import { SITE_METADATA } from "@/constants";

export default function ThankYouPage() {
  return (
    <Suspense>
      <header className="w-full bg-zinc-100">
        <MaxWidthWrapper className="flex items-center justify-center py-4 gap-y-3">
          <Logo height={70} width={70} />
        </MaxWidthWrapper>
      </header>
      <ThankYou />
      <footer className="absolute w-full -bottom-40 bg-zinc-100 text-zinc-900 py-10">
        <MaxWidthWrapper className="flex items-center justify-between">
          <div>
            &copy; {new Date().getFullYear()} {SITE_METADATA.name}. All rights
            reserved.
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <Link href={"#"}>Terms of Use</Link>
              </li>
              <li>
                <Link href={"#"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"#"}>Refund Policy</Link>
              </li>
            </ul>
          </div>
        </MaxWidthWrapper>
      </footer>
    </Suspense>
  );
}
