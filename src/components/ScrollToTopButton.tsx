"use client";
import { ChevronUp } from "lucide-react";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      title="Back to Top"
      className="flex flex-col items-center justify-center mx-auto my-5"
    >
      <div className="p-3 rounded-full border border-zinc-500 bg-gray-100 text-zinc-900">
        <ChevronUp size={35} strokeWidth={1} />
      </div>
      <span className="mt-3 text-sm">Back to Top</span>
    </button>
  );
};

export default ScrollToTopButton;
