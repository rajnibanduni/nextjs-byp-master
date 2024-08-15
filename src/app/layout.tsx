import type { Metadata } from "next";
import { Krub } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";
import { Footer } from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header/Header";
import { Suspense } from "react";
import { SITE_METADATA } from "@/constants";

const krub = Krub({
  weight: ["200", "300", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("relative antialiased", krub.className)}>
        <Suspense>
          <QueryProvider>
            <main className="flex flex-col min-h-screen">
              {/* Header */}
              <Header />

              <div className="flex-grow flex-1">{children}</div>
              {/* Footer */}
              <Footer />
            </main>
            <Toaster />
          </QueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
