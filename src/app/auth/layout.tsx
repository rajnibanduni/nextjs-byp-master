import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="px-4 bg-gray-50">
      {/* Home Link */}
      <Link
        href="/"
        className="text-sm h-10 pl-2 pr-4 gap-0 font-semibold inline-flex items-center justify-center select-none rounded-full disabled:cursor-not-allowed disabled:opacity-70 transition ease-in-out duration-200 absolute left-0 top-6 md:left-6"
      >
        <ArrowLeft size={18} strokeWidth={1} /> Home
      </Link>

      <div className="min-h-screen flex justify-center items-center">
        {children}
      </div>
    </section>
  );
}
