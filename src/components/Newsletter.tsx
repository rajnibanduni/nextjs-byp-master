import { Mail } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export default function Newsletter() {
  return (
    <MaxWidthWrapper>
      <Separator />
      <section className="grid lg:grid-cols-2 py-12 gap-5">
        <div className="flex items-start max-w-lg">
          {/* Icon */}
          <Mail className="text-gray-400" size={100} strokeWidth={1} />
          <div className="ml-5 space-y-3">
            <p className="text-primary font-semibold">
              Join our newsletter for $10 offs
            </p>
            <h3 className="font-semibold text-2xl">
              Get our emails for info on new items, sales and much more.
            </h3>
            <p className="text-sm text-gray-400 max-w-sm font-thin">
              Register now to get latest updates on promotions & coupons. Don’t
              worry, we not spam!
            </p>
          </div>
        </div>
        <div className="lg:ml-auto space-y-5 lg:space-y-1">
          <div className="flex relative">
            <Input
              placeholder="Enter your email address"
              className="h-12"
              type="email"
            />
            <Button type="submit" className="absolute right-0 h-12">
              Subscribe
            </Button>
          </div>
          {/* T & C */}
          <p className="text-xs text-gray-600">
            By subscribing you agree to our{" "}
            <Link
              href={"/terms-and-conditions"}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
                "m-0 p-0 text-xs"
              )}
            >
              Terms & Conditions and Privacy & Cookies Policy.
            </Link>
          </p>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
