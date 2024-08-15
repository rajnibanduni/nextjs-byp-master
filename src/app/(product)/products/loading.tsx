import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="mx-auto mt-10">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h3 className="font-semibold text-xl">Loading...</h3>
      </div>
    </div>
  );
}
