import MobileSidebarFilters from "@/components/Filters/MobileSidebarFilters";
import PartsFinder from "@/components/Filters/PartsFinder";
import ProductsHeaderFilter from "@/components/Filters/ProductsHeaderFilter";
import { Label } from "@/components/ui/label";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid lg:grid-cols-4 gap-x-5 my-10">
      {/* Left Side */}
      <div className="hidden lg:block">
        <PartsFinder />
      </div>
      {/* Right Side */}
      <div className="col-span-3">
        {/* Filters */}
        <div className="hidden lg:block md:block">
          <ProductsHeaderFilter />
        </div>
        {/* Mobile Filters */}
        <div className="block lg:hidden md:hidden">
          <div className="bg-gray-100 p-3 flex items-center justify-between rounded-lg">
            <MobileSidebarFilters />
            <div className="flex items-center gap-x-2">
              <Label htmlFor="sort">Sort:</Label>
              <select
                name="sort"
                id="sort"
                className="bg-transparent text-sm max-w-[140px] outline-none"
              >
                <option value="popular">Sort by popularity</option>
                <option value="avgRating">Sort by average rating</option>
                <option value="latest">Sort by latest</option>
                <option value="low-to-high">Sort by price: low to high</option>
                <option value="high-to-low">Sort by price: high to low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display products here */}
        {children}
      </div>
    </section>
  );
}
