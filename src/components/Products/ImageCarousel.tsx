"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

export default function ImageCarousel({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (selectedIndex !== index) return;
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)", // Adjust the scale value for more zoom
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  const handleIndexChange = (newIndex: number) => {
    setPrevIndex(selectedIndex);
    setSelectedIndex(newIndex);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Carousel className="rounded-lg overflow-hidden">
        <section className="border rounded-lg overflow-hidden">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className={index === selectedIndex ? "block" : "hidden"}
              >
                <Link href="#" className="block" prefetch={false}>
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={800}
                    height={800}
                    className="w-full h-[400px] md:h-[600px] object-scale-down transition-transform duration-300 cursor-zoom-in"
                    style={index === selectedIndex ? zoomStyle : {}}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={handleMouseLeave}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </section>
      </Carousel>
      <div className="grid grid-cols-6 gap-1 mt-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleIndexChange(index)}
            className={`block border-2 rounded-lg transition-transform duration-300 ${
              index === selectedIndex
                ? "border-primary"
                : "border-transparent hover:border-muted"
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={200}
              height={200}
              className="w-full h-auto object-cover rounded-lg border"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
