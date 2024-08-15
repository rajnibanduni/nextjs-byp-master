"use client";
import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useCallback, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn, createUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { name: "None", value: "none" },
  { name: "Popular", value: "popular" },
  { name: "Latest", value: "desc" },
  { name: "Price : Low to High", value: "price-asc" },
  { name: "Price : High to Low", value: "price-desc" },
] as const;

const PER_PAGE_OPTIONS = [16, 32, 48, 64] as const;

export default function ProductsHeaderFilter() {
  const query = useSearchParams();
  const router = useRouter();

  const currentSort = query.get("sort") || "none";
  const currentPerPage = Number(query.get("perPage")) || 16;

  const updateQuery = useCallback(
    (key: string, value: string | number | "") => {
      const params = new URLSearchParams(query.toString());
      if (value === "") {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
      router.push(createUrl("/products", params), { scroll: false });
    },
    [query, router]
  );

  const handleSortChange = (value: string) => {
    updateQuery("sort", value);
  };

  const handlePerPageChange = (value: number) => {
    updateQuery("perPage", value);
  };

  return (
    <div className="flex items-center gap-x-2">
      {/* Sort Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger className="group inline-flex items-center justify-center text-xs lg:text-sm font-medium text-gray-700 hover:text-gray-900">
          Sort: {SORT_OPTIONS.find((o) => o.value === currentSort)?.name}
          <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={cn(
                "text-left w-full block px-4 py-2 text-xs lg:text-sm",
                {
                  "text-gray-900 bg-gray-100": option.value === currentSort,
                  "text-gray-500": option.value !== currentSort,
                }
              )}
              onClick={() => handleSortChange(option.value)}
            >
              {option.name}
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 border" />

      {/* Per Page Filter */}
      <div className="flex items-center gap-x-2">
        <Label htmlFor="perPage" className="text-xs lg:text-sm">
          Show:
        </Label>
        <select
          id="perPage"
          className="bg-transparent max-w-[140px] outline-none text-xs lg:text-sm"
          value={currentPerPage}
          onChange={(e) => handlePerPageChange(Number(e.target.value))}
        >
          {PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option} items
            </option>
          ))}
        </select>
      </div>

      <Separator
        orientation="vertical"
        className="hidden lg:block md:block h-6 border"
      />

      {/* View Toggle */}
      <div className="hidden lg:flex md:flex items-center gap-x-3">
        <button className="bg-gray-200 rounded-md p-[5px] shadow-sm cursor-pointer">
          <LayoutGrid strokeWidth={1} size={20} />
        </button>
        <button className="bg-white rounded-md p-[5px] shadow-sm cursor-pointer">
          <List strokeWidth={1} size={20} />
        </button>
      </div>
    </div>
  );
}
