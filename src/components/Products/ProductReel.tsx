import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { Separator } from "../ui/separator";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default function ProductReel({ products }: { products: Product[] }) {
  // TODO: fix rendering + slider indicators issues
  // const [api, setAPI] = useState<CarouselApi | null>(null);
  // const [activeIndex, setActiveIndex] = useState(0);

  // useEffect(() => {
  //   if (!api) return;
  //   const onSelect = () => {
  //     const selectedIndex = api.selectedScrollSnap();
  //     if (selectedIndex !== activeIndex) {
  //       setActiveIndex(selectedIndex);
  //     }
  //   };

  //   onSelect();

  //   api.on("select", onSelect);

  //   // Clean up the event listener on unmount
  //   return () => {
  //     api.off("select", onSelect);
  //   };
  // }, [api, activeIndex]);

  // const handleIndicatorClick = (index: number) => {
  //   if (!api) return;
  //   api.scrollTo(index);
  // };

  if (!products.length) return null;

  return (
    <section className="py-2 mx-auto">
      <div className="w-full">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          // setApi={setAPI}
        >
          <CarouselContent>
            {products?.map((p) => (
              <CarouselItem
                key={p.productId}
                className="gap-x-5 lg:space-x-5 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="flex">
                  <ProductCard product={p} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>

      <Separator className="my-5" />
      {/* slider indicators */}
      {/* <div className="flex justify-center space-x-2">
        {products.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              activeIndex === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </section>
  );
}
