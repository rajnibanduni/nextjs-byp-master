import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import CategoryItems from "../Header/CategoryList";
import Link from "next/link";
import { Separator } from "../ui/separator";
import PartsFinder from "./PartsFinder";
import { Label } from "../ui/label";
import Filters from "./Filters";

export default function MobileSidebarFilters() {
  return (
    <Sheet>
      <SheetTrigger aria-label="toggle menu">
        <div className="flex items-center gap-x-1">
          <Filter
            size={18}
            className="cursor-pointer"
            strokeWidth={1}
            id="filter"
          />
          <Label htmlFor="filter" className="cursor-pointer text-xs lg:text-sm">
            Filter
          </Label>
        </div>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full md:w-[400px] lg:w-[450px] p-0"
      >
        <SheetHeader className="px-5 py-2">
          <SheetTitle className="text-sm font-semibold text-left my-5">
            Filter Products
          </SheetTitle>
          <Separator />
        </SheetHeader>
        <ScrollArea className="h-full px-5">
          {/* Parts Finder */}
          <PartsFinder />

          <div className="space-y-5 mt-10 mb-24">
            <Filters />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
