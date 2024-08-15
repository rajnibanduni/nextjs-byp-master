"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Separator } from "../ui/separator";
import {
  BatteryCharging,
  CarFront,
  ChevronDown,
  ChevronRight,
  Home,
  KeySquare,
  LoaderPinwheel,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react";

interface Category {
  icon: JSX.Element;
  name: string;
  link: string;
  subCategories?: {
    name: string;
    link: string;
  }[];
}

interface Props {
  className?: string;
  direction?: string;
}

const categoryItems: Category[] = [
  {
    icon: <Sun strokeWidth={1} />,
    name: "Headlights",
    link: "/headlights",
    subCategories: [
      {
        name: "Fog Lights",
        link: "/fog-lights",
      },
      {
        name: "Reflectors",
        link: "/reflactors",
      },
    ],
  },
  {
    icon: <CarFront strokeWidth={1} />,
    name: "Interior Accessories",
    link: "/interior-accessories",
  },
  {
    icon: <LoaderPinwheel strokeWidth={1} />,
    name: "Tires & Wheels",
    link: "/tires-and-wheels",
    subCategories: [
      {
        name: "Fog Lights",
        link: "/fog-lights",
      },
      {
        name: "Reflectors",
        link: "/reflactors",
      },
    ],
  },
  {
    icon: <Wrench strokeWidth={1} />,
    name: "Tools & Equipments",
    link: "/tools-equipmets",
  },
  {
    icon: <KeySquare strokeWidth={1} />,
    name: "Auto Safety & Security",
    link: "/auto-safety-security",
  },
  {
    icon: <Home strokeWidth={1} />,
    name: "Garage Tools",
    link: "/garage-tools",
  },
  {
    icon: <BatteryCharging strokeWidth={1} />,
    name: "Original Battery",
    link: "/original-battery",
  },
  {
    icon: <Sparkles strokeWidth={1} />,
    name: "Buyurparts Bestsellers",
    link: "/bestsellers",
  },
];

const CategoryItems: React.FC<Props> = ({
  className,
  direction = "bottom",
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (link: string) => {
    if (expandedCategories.includes(link)) {
      setExpandedCategories(expandedCategories.filter((item) => item !== link));
    } else {
      setExpandedCategories([...expandedCategories, link]);
    }
  };

  const handleArrowClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: string
  ) => {
    event.stopPropagation();
    toggleCategory(link);
  };

  return (
    <>
      {direction === "bottom" ? (
        <div className={cn("", className)}>
          <ul>
            {categoryItems &&
              categoryItems.map((item: Category) => (
                <div key={item.link}>
                  <div className="group flex items-center justify-between">
                    <Link href={item.link} passHref>
                      <li className="flex py-2 justify-between cursor-pointer">
                        <div className="flex space-x-2">
                          {item.icon}
                          <span className="font-semibold text-base">
                            {item.name}
                          </span>
                        </div>
                      </li>
                    </Link>

                    {item.subCategories && (
                      <ChevronDown
                        className="h-4 w-4 opacity-50 cursor-pointer"
                        onClick={(e: any) => handleArrowClick(e, item.link)}
                      />
                    )}
                  </div>
                  {item.subCategories &&
                    expandedCategories.includes(item.link) &&
                    item.subCategories.map((subcat) => (
                      <div key={subcat.link}>
                        <Link href={subcat.link} passHref>
                          <li className="flex py-2 justify-between cursor-pointer">
                            <span className="text-sm ml-8">{subcat.name}</span>
                          </li>
                        </Link>
                      </div>
                    ))}
                  <Separator />
                </div>
              ))}
            <Link href="/new-arrivals" passHref>
              <li className="flex p-2 justify-between cursor-pointer w-full items-center">
                <div className="font-semibold text-base">New Arrivals</div>
                <div className="px-2 py-1 bg-sky-400 text-white rounded-xl font-bold text-xs">
                  NEW
                </div>
              </li>
            </Link>
          </ul>
        </div>
      ) : (
        <div className={cn("border relative", className)}>
          <ul>
            {categoryItems &&
              categoryItems.map((item) => (
                <div key={item.link} className="group">
                  <div className="relative flex items-center justify-between px-3 py-4  hover:bg-red-300/10 w-full h-full">{/* Changes done*/}
                    <Link href={item.link} passHref>
                      <li className="flex justify-between w-full cursor-pointer group-hover:text-red-500">
                        <div className="flex space-x-2 items-center">
                          {item.icon}
                          <span className="text-sm">{item.name}</span>
                        </div>
                      </li>
                    </Link>
                    {item.subCategories && (
                      <ChevronRight className="h-4 w-4 opacity-50 cursor-pointer group-hover:text-red-500" />
                    )}
                  </div>
                  {item.subCategories && (
                    <div className="absolute left-full top-0 hidden group-hover:block bg-white border shadow-lg p-5 w-[300px] rounded-r-xl rounded-bl-lg h-full">
                      <ul className="flex flex-col space-y-1">
                        {item.subCategories.map((subcat) => (
                          <Link key={subcat.link} href={subcat.link} passHref>
                            <li className="cursor-pointer">
                              <span className="text-sm">{subcat.name}</span>
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  )}
                  <hr />
                </div>
              ))}
            <Link href="/new-arrivals" passHref>
              <li className="flex px-3 py-2.5 justify-between cursor-pointer w-full items-center hover:bg-red-300/10 hover:text-red-500">
                <div className="text-sm">New Arrivals</div>
                <div className="px-2 py-1 bg-sky-400 text-white rounded-xl font-bold text-xs">
                  NEW
                </div>
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default CategoryItems;
