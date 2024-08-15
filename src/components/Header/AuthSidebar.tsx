import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { Separator } from "../ui/separator";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import { SITE_METADATA } from "@/constants";

const AuthSidebar = () => {
  return (
    <>
      {/* Login */}
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <span
              className={cn(
                "w-full bg-sky-500",
                buttonVariants({
                  variant: "sky",
                })
              )}
            >
              Login
            </span>
          </div>
        </SheetTrigger>

        <SheetContent side="right" className="w-[350px] p-0 h-screen">
          <SheetHeader className="p-3">
            <SheetTitle>Account</SheetTitle>
          </SheetHeader>
          <Separator />
          <ScrollArea className="py-5 px-3 h-full">
            {/* Login Form */}
            <section className="p-2">
              <LoginForm />
            </section>

            <SheetFooter className="mt-auto">
              <span className="text-xs mx-auto">
                Copyright {new Date().getFullYear()} &copy;{" "}
                <Link href="/" className="hover:underline ">
                  {SITE_METADATA.name}
                </Link>
                . All right reserved.
              </span>
            </SheetFooter>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Register  */}
      <Sheet>
        <SheetTrigger asChild>
          <div>
            <div className="my-3 text-center">
              <span>New Customer? </span>
              <span
                className={cn(
                  buttonVariants({
                    variant: "link",
                  }),
                  "p-0"
                )}
              >
                Sign Up
              </span>
            </div>
          </div>
        </SheetTrigger>

        <SheetContent side="right" className="w-[350px] p-0">
          <SheetHeader className="p-3">
            <SheetTitle>Account</SheetTitle>
          </SheetHeader>
          <Separator />
          <ScrollArea className="h-screen p-5">
            <section className="px-1 py-3">
              {/* Register Form  */}
              <RegisterForm />
            </section>

            <SheetFooter className="mt-10">
              <span className="text-xs mx-auto">
                Copyright {new Date().getFullYear()} &copy;{" "}
                <Link href="/" className="hover:underline ">
                  {SITE_METADATA.name}
                </Link>
                . All right reserved.
              </span>
            </SheetFooter>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default AuthSidebar;
