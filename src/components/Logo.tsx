import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className,
  height = 70,
  width = 110,
}: {
  className?: string;
  height?: number;
  width?: number;
}) {
  return (
    <>
      <Link href="/">
        <Image
          src="/images/logo.webp"
          alt="logo"
          height={height}
          width={width}
          className={cn("w-auto h-auto aspect-square", className)}
          priority
        />
      </Link>
    </>
  );
}
