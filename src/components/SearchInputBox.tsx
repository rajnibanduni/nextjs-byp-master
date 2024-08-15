"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/lib/utils";

export default function SearchInputBox() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());
    if (search.value) {
      newParams.set("q", search.value);
    } else {
      newParams.delete("q");
    }

    router.push(createUrl("/products", newParams));
  };
  return (
    <section className="relative w-full">
      <form onSubmit={onSubmit}>
        <Input
          placeholder="Find Parts and Products..."
          className="w-full h-[3rem]"
          name="search"
          key={searchParams?.get("q")}
          autoComplete="off"
          defaultValue={searchParams?.get("q") || ""}
        />
        <button
          type="submit"
          className="absolute top-[50%] right-0 translate-y-[-50%] cursor-pointer mr-2 bg-white h-auto"
        >
          <Search />
        </button>
      </form>
    </section>
  );
}
