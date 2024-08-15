import { ArrowRight } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import CustomImage from "./CustomImage";

const CATEGORIES = [
  {
    name: "Auto Safety & Security",
    imageURL: "/images/category-electrics.png",
    itemCount: 2,
    href: "#",
  },
  {
    name: "Garage Tools",
    imageURL: "/images/category-brakes.png",
    itemCount: 1,
    href: "#",
  },
  {
    name: "Headlight & Lighing",
    imageURL: "/images/category-glowplug.png",
    itemCount: 9,
    href: "#",
  },
  {
    name: "Interior Accessories",
    imageURL: "/images/category-car-care.png",
    itemCount: 25,
    href: "#",
  },
  {
    name: "Tires & Wheels",
    imageURL: "/images/category-tyres.png",
    itemCount: 7,
    href: "#",
  },
  {
    name: "Tools & Equipment",
    imageURL: "/images/category-filters.png",
    itemCount: 5,
    href: "#",
  },
];

export default function TopCategories() {
  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <h3 className="text-lg font-semibold">Top Categories</h3>
        <Link
          href="#"
          className="flex items-center ml-auto text-sm hover:text-red-500 font-medium"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Separator className="my-3" />
      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border rounded-lg">
        {/* Category List */}
        {CATEGORIES.map((cat) => (
          <div className="p-5 lg:border-r last:border-0" key={cat.href}>
            <div className="flex flex-col items-center group transition-all">
              <Link href="#" className="group-hover:text-primary text-sm">
                <CustomImage
                  src={cat.imageURL}
                  height={200}
                  width={200}
                  alt={cat.name}
                  className="border rounded-lg w-full group-hover:opacity-80 ease-out duration-200"
                />
                <h3 className="mt-2 text-center font-semibold">{cat.name}</h3>
              </Link>
              <span className="text-xs">{cat.itemCount} item(s)</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
