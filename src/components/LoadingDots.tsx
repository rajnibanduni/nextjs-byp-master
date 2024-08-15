export default function LoadingDots() {
  return (
    <div className="inline-flex items-center bg-white dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="mx-[1px] inline-block h-1 w-1 bg-black rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="mx-[1px] inline-block h-1 w-1 bg-black rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="mx-[1px] inline-block h-1 w-1 bg-black rounded-full animate-pulse"></div>
    </div>
  );
}
