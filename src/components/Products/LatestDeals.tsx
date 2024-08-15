import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Image from "next/image";
import ReviewStar from "../ReviewStar";
import { Progress } from "../ui/progress";

export default function LatestDeals() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col lg:flex-row items-center space-x-3">
          <h3 className="text-xl font-semibold">Latest Deals for This Week</h3>
          <p className="text-sm text-gray-400 font-light">
            Dont miss out on this weeks deals
          </p>
        </div>
        <Link
          href="#"
          className="flex items-center ml-auto text-sm hover:text-red-500 font-medium"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Separator className="my-5" />
      <div className="grid lg:grid-cols-2 gap-x-5 gap-y-5 transition-all ease-in-out">
        <div className="h-25 hover:border-red-600 ease-in rounded-lg border-[2px] p-7 space-x-5">
          <div className="flex justify-between items-center">
            <div className="border rounded-lg overflow-hidden">
              {/* Product Image */}
              <Image
                src="/images/deal-1.jpg"
                alt="Latest deal"
                height={200}
                width={200}
              />
            </div>
            <div className="mx-3">
              {/* Content */}
              <h3 className="font-bold text-base max-w-80">
                5″ Monitor with 1080P Backup Camera for Truck
              </h3>
              <ReviewStar rating={2.1} /> <span>1 review</span>
              <div className="flex items-end space-x-3">
                <span className="text-lg">
                  <s>$88.99</s>
                </span>
                <span className="text-primary text-2xl font-bold">$68.99</span>
              </div>
              <Progress value={78} className="my-5" aria-hidden="false" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">
                    Available:
                  </span>
                  <h3 className="text-sm font-bold">&nbsp;39</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">Sold:</span>
                  <h3 className="text-sm font-bold">&nbsp;39</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-25 hover:border-red-600 ease-in rounded-lg border-[2px] p-7 space-x-5">
          <div className="flex justify-between items-center">
            <div className="border rounded-lg overflow-hidden">
              {/* Product Image */}
              <Image
                src="/images/deal-2.jpg"
                alt="Latest deal"
                height={200}
                width={200}
              />
            </div>
            <div className="mx-3">
              {/* Content */}
              <h3 className="font-bold text-base max-w-80">
                5″ Monitor with 1080P Backup Camera for Truck
              </h3>
              <ReviewStar rating={2.1} /> <span>1 review</span>
              <div className="flex items-end space-x-3">
                <span className="text-lg">
                  <s>$88.99</s>
                </span>
                <span className="text-primary text-2xl font-bold">$68.99</span>
              </div>
              <Progress value={78} className="my-5" />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">
                    Available:
                  </span>
                  <h3 className="text-sm font-bold">&nbsp;39</h3>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground">Sold:</span>
                  <h3 className="text-sm font-bold">&nbsp;39</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
