"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { EmailSignInAction } from "@/actions/AuthAction";
import { cn } from "@/lib/utils";
import { LoaderCircle, LogIn } from "lucide-react";
import { useState } from "react";
import FormSuccess from "./FormSuccess";
import FormError from "./FormError";
import Logo from "../Logo";
import { toast } from "sonner";
import { useStore } from "@/store/store";
import { LoginForm as LoginFrm, LoginSchema } from "@/types/authSchema";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

export default function LoginForm() {
  const router = useRouter();
  const return_url = useSearchParams().get("return_url");

  const { fetchAndSetUser } = useStore();
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const { execute, status } = useAction(EmailSignInAction, {
    async onSuccess(data) {
      if (data?.error) setError(data.error);
      if (data?.success) {
        toast.success(data.success);
        await fetchAndSetUser();
        setSuccess(data.success);

        // Redirect to return URL if provided, otherwise to /account page
        router.push(return_url || "/account");
        // window.location.href = "/account";
      }
    },
    onError(data) {
      if (data.serverError) setError(data.serverError);
    },
  });

  const onSubmit = (v: LoginFrm) => {
    setError("");
    setSuccess("");
    execute(v);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Logo className="mx-auto my-5" />
        <div className="text-center my-5">
          <h2 className="font-semibold text-xl">Welcome back!</h2>
          <p className="text-sm my-2 font-[400] text-zinc-700">
            Please enter your details to sign in.
          </p>
        </div>
        <div className="space-y-3">
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

        <div className="my-3 flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-end space-x-1">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-zinc-900 data-[state=checked]:bg-zinc-900"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href="/password-reset"
            className="underline text-sm text-zinc-800 hover:text-zinc-700 font-semibold"
          >
            Forgot password?
          </Link>
        </div>

        {/* Success/Error message */}
        <FormSuccess message={success} />
        <FormError message={error} />

        <Button
          type="submit"
          className={cn("w-full my-2 bg-zinc-900 hover:bg-zinc-700 text-white")}
          disabled={status === "executing"}
        >
          {status === "executing" ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              Log in <LogIn size={20} />
            </>
          )}
        </Button>

        <div className="flex items-center mt-3">
          <span className="text-sm ml-auto font-semibold text-zinc-500">
            Don&apos;t have an account yet?
          </span>
          <Link
            href="/auth/register"
            className="font-semibold text-sm text-red-500 hover:text-zinc-700 ml-2 mr-auto"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}
