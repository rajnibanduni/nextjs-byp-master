"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import type SwiperType from "swiper";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSliderProps {
  images: {
    url: string;
    alt: string;
    _id: string;
  }[];
}

export default function ProductSlider({ images }: ProductSliderProps) {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBegining: true,
    isEnd: activeIndex === (images.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBegining: activeIndex === 0,
        isEnd: activeIndex === (images.length ?? 0) - 1,
      });
    });
  }, [swiper, images]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";

  const inactiveStyles = "hidden text-gray-400";
  return (
    <div className="group relative bg-zinc-100 border aspect-square rounded-xl overflow-hidden">
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, "right-0 transition", {
            [inactiveStyles]: slideConfig.isEnd,
            "bg-zinc-500/50 hover:bg-zinc-100  text-white hover:text-zinc-700 opacity-100":
              !slideConfig.isEnd,
          })}
          aria-label="next image"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, "left-0 transition", {
            [inactiveStyles]: slideConfig.isBegining,
            "bg-zinc-500/50 hover:bg-zinc-100  text-white hover:text-zinc-700 opacity-100":
              !slideConfig.isBegining,
          })}
          aria-label="previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
      {/* Swiper */}
      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        className="h-full w-full"
        spaceBetween={50}
        modules={[Pagination]}
        slidesPerView={1}
      >
        {images?.map((image, i) => (
          <SwiperSlide key={i} className="-z-10 relative h-full w-full">
            <Image
              src={image.url}
              fill
              alt={image?.alt}
              loading="eager"
              className="-z-10 h-full w-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
