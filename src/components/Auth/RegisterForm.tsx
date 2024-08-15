"use client";

import { RegisterUserAction } from "@/actions/AuthAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { CircleFadingPlus, LoaderCircle } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import FormError from "./FormError";
import Logo from "../Logo";
import { toast } from "sonner";
import {
  RegisterForm as registerFrm,
  RegisterSchema,
} from "@/types/authSchema";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { execute, status } = useAction(RegisterUserAction, {
    onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) {
        toast.success(data.success, {
          description: "The link is valid only for 24hrs.",
          duration: 4000,
        });
        setSuccess(data.success);
      }
    },
    onError(data) {
      if (data.serverError) setError(data.serverError);
    },
  });

  const onSubmit = (v: registerFrm) => {
    setError("");
    setSuccess("");
    execute(v);
  };

  return (
   <div className="register-form xl:p-10 lg:p-10 md:p-5">{/* Changes done*/}
    {/* bg-white drop-shadow-2xl p-10 rounded-2xl */}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Logo className="mx-auto my-5" />
        <div className="text-center my-5">
          <h2 className="font-semibold text-xl">BECOME A MEMBER</h2>
          <p className="text-sm my-2 font-[400] text-zinc-700">
            With our extensive collection of automotive parts and accessories,
            we are the ultimate destination for all your needs.
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold">First Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      autoComplete="firstName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-semibold">Last Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      autoComplete="firstName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">E-Mail Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email..."
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                    {...field}
                    type="password"
                    autoComplete="current-password"
                    className="placeholder:tracking-[.3rem]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Link
          href="/password-reset"
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
        >
          Forgot your password ?
        </Link>

        {/* Success/Error message */}
        {/* <FormSuccess message={success} /> */}
        <FormError message={error} />
        <Button
          type="submit"
          className="w-full my-2 bg-zinc-900 hover:bg-zinc-700 text-white"
          disabled={status === "executing"}
        >
          {status === "executing" ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              Register <CircleFadingPlus size={20} className="mx-1" />
            </>
          )}
        </Button>

        <div className="flex items-center mt-3">
          <span className="text-sm ml-auto">Already have an account?</span>
          <Link
            href="/auth/register"
            className="font-semibold text-sm text-red-500 hover:text-zinc-700 ml-2 mr-auto"
          >
            Sign in
          </Link>
        </div>
      </form>
    </Form>
   </div> 
  );
}
