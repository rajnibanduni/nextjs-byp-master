"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

interface sContent {
  p: string;
  h1: string;
  topTxt: string;
  price: string;
  discountedPrice: string;
  image: {
    url: string;
    alt: string;
  };
  href: string;
}

const sliderContent: sContent[] = [
  {
    topTxt: "This Week Only for World Premier",
    h1: "When Buying Parts With Installation",
    image: {
      url: "/images/slider-03.jpg",
      alt: "slider-1",
    },
    p: "Installation of parts in the services of, our partners. Limited time offer for only new customer, also get free shipping on orders.",
    price: "$179.00",
    discountedPrice: "$159.00",
    href: "#",
  },
  {
    topTxt: "Get The Best Auto Parts",
    h1: "We Make Car Repair Hassle Free",
    image: {
      url: "/images/slider-03.jpg",
      alt: "slider-2",
    },
    p: "Installation of parts in the services of, our partners. Limited time offer for only new customer, also get free shipping on orders.",
    discountedPrice: "",
    price: "",
    href: "",
  },
  {
    topTxt: "This Week Only for World Premier",
    h1: "We Have The Parts You Need",
    image: {
      url: "/images/slider-03.jpg",
      alt: "slider-2",
    },
    p: "Installation of parts in the services of, our partners. Limited time offer for only new customer, also get free shipping on orders.",
    discountedPrice: "$159.00",
    price: "$179.00",
    href: "",
  },
];

export default function MainSlider() {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (sliderContent.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (sliderContent.length ?? 0) - 1,
      });
    });
  }, [swiper]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center bg-white";

  const inactiveStyles = "hidden text-gray-400";
  return (
    <MaxWidthWrapper className="mt-5 h-96 lg:h-full ">
      <section className="mx-auto h-full px-0 lg:pl-5 py-1 grid lg:grid-cols-4">
        <div className="hidden lg:col-span-1 bg-transparent lg:block"></div>
        <div className="relative group bg-zinc-100 border aspect-video rounded-xl overflow-hidden col-span-full h-full w-full lg:col-span-3">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={(e) => {
                e.preventDefault();
                swiper?.slideNext();
              }}
              className={cn(activeStyles, "right-0 transition", {
                [inactiveStyles]: slideConfig.isEnd,
                "bg-white opacity-100 h-14 rounded-l-lg px-2":
                  !slideConfig.isEnd,
              })}
              aria-label="next image"
            >
              <ChevronRight className="h-4 w-4 text-black" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                swiper?.slidePrev();
              }}
              className={cn(activeStyles, "left-0 transition", {
                [inactiveStyles]: slideConfig.isBeginning,
                "bg-white opacity-100 h-14 rounded-r-lg px-2":
                  !slideConfig.isBeginning,
              })}
              aria-label="previous image"
            >
              <ChevronLeft className="h-4 w-4 text-black" />
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
            className="h-full w-full main-slider"
            spaceBetween={50}
            modules={[Pagination]}
            slidesPerView={1}
          >
            {sliderContent?.map((content, i) => (
              <SwiperSlide key={i} className="relative lg:h-full w-full">
                <Image
                  src={content?.image.url}
                  fill
                  alt={content?.image.alt}
                  loading="eager"
                  className="-z-10 h-full w-full object-cover object-center"
                />
                {/* Slider Content */}
                <div className="backdrop-opacity-10 backdrop-invert bg-white/3 h-full">
                  <div className="max-w-lg p-7 flex justify-center flex-col h-full space-y-2 lg:space-y-5 text-white">
                    <p className="capitalize">{content.topTxt}</p>
                    <h1 className="text-5xl leading-[3rem] font-bold capitalize">
                      {content.h1}
                    </h1>
                    <p className="capitalize text-gray-300 text-sm">
                      {content.p}
                    </p>
                    <div className="flex space-x-2 items-baseline">
                      <h3 className="text-gray-300 text-xl">
                        <s>{content.price}</s>
                      </h3>
                      <h2 className="text-3xl font-semibold">
                        {content.discountedPrice}
                      </h2>
                    </div>
                    {/* CTA */}
                    <Link href={content.href}>
                      <Button>Buy Now</Button>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
