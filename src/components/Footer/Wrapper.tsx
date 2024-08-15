"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const Wrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) {
    return;
  } else if (pathname.startsWith("/checkout")) {
    return;
  } else if (pathname.startsWith("/thank-you")) {
    return;
  }

  return <>{children}</>;
};
