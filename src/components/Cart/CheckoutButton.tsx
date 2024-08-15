"use client";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <Button
      className="w-full"
      onClick={() => {
        setIsLoading(true);
        router.push("/checkout");
      }}
      disabled={isLoading}
      type="submit"
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        "Proceed to checkout"
      )}
    </Button>
  );
}
