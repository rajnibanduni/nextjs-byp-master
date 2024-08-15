import { cn } from "@/lib/utils";
import Image from "next/image";

/* 
This function will handle the layouts shifts of the images as well as the SEO of the image.
*/

export default function CustomImage({
  src,
  height,
  width,
  fill,
  alt,
  className,
  ...props
}: {
  src: string;
  height?: number;
  width?: number;
  fill?: true;
  alt: string;
  className?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        height={height}
        width={width}
        className={cn("w-auto h-auto", className)}
        fill={fill && true}
        {...props}
      />
    </>
  );
}
