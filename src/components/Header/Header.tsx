"use server";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import MainNav from "./MainNav";
import Sidebar from "./Sidebar";
import PartsFinder from "./PartsFinder";
import { Input } from "../ui/input";
import HeartIcon from "../icons/Heart";
import SearchIcon from "../icons/Search";
import MobileNav from "./MobileNav";
import Logo from "../Logo";
import ProfileDropdown from "./ProfileDropdown";
import { HeaderWrapper } from "./HeaderWrapper";
import CartSidebar from "../Cart/CartSidebar";
import SearchInputBox from "../SearchInputBox";
import { SITE_METADATA } from "@/constants";

export default async function Header() {
  return (
    <HeaderWrapper>
      <header className="relative">
        <div className="w-full bg-primary h-[7px]"></div>

        {/* Top Header */}
        <div className="hidden lg:block xl:block border-b">
          <MaxWidthWrapper className="py-2">
            <div className="flex justify-between items-center">
              <nav className="space-x-5 text-xs font-medium">
                <Link href="/about">About Us</Link>
                <Link href="/account">My Account</Link>
                <Link href="/track-order">Order Tracking</Link>
                <Link href="/account/wishlist">Wishlist</Link>
              </nav>

              <div className="flex items-center text-sm">
                <span className="opacity-50 text-xs">
                  Need Help? Call us:&nbsp;
                </span>
                <Link href="/" className="font-semibold">
                  {SITE_METADATA.phone}
                </Link>
                <span className="opacity-50">&nbsp;or&nbsp;</span>
                <Link href="/" className="font-semibold">
                  {SITE_METADATA.email}
                </Link>
                <Separator orientation="vertical" />
                <div className="mx-5">
                  <Select>
                    <SelectTrigger className="border-0 select-none outline-none h-auto hover:text-red-600 p-0">
                      <SelectValue placeholder="English" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="border-0 select-none outline-none h-auto hover:text-red-600 p-0">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>

        {/* Main Header */}
        <div className="hidden lg:block xl:block shadow-custom">
          <MaxWidthWrapper className="py-5 flex space-x-5 items-center">
            <div className="flex items-center space-x-5">
              {/* Sidebar */}
              <Sidebar />
              {/* Logo */}
              <div>
                <Logo />
              </div>
              {/* Parts Finder */}
              <PartsFinder strokeWidth={1} size={30} />
            </div>

            <div className="flex-1">
              {/* Search Box */}
              {/* <div className="relative">
                <Input
                  className="w-full h-[3rem]"
                  placeholder="Find Parts and Products"
                />
                <SearchIcon className="absolute right-2 top-3 bg-white cursor-pointer" />
              </div> */}
              <SearchInputBox />
            </div>

            <div className="flex items-center space-x-5">
              {/* My Account */}
              <ProfileDropdown />
              {/* Wishlist */}
              <div className="relative cursor-pointer">
                <span className="absolute -top-2 -right-2 bg-primary text-white px-[5px] py-[0.1px] rounded-full text-xs">
                  0
                </span>
                <HeartIcon />
              </div>
              {/* Cart */}
              <CartSidebar />
            </div>
          </MaxWidthWrapper>

          {/* Main Nav Menu*/}
          <div className="shadow-sm">
            <MainNav />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden shadow-sm mx-1">
          <MaxWidthWrapper>
            <div className="flex items-center h-14 justify-between">
              {/* Sidebar */}
              <Sidebar />
              {/* Logo */}
              <Logo className="mx-auto" width={60} />
              {/* Cart */}
              <CartSidebar />
            </div>
          </MaxWidthWrapper>

          {/* Mobile Nav */}
          <MobileNav />
        </div>
      </header>
    </HeaderWrapper>
  );
}
