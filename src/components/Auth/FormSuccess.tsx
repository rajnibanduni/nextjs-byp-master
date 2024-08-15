import { CheckCircle2 } from "lucide-react";

export default function FormSuccess({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 bg-successDark p-3 rounded-md">
      <CheckCircle2 className="w-7 h-7 text-white" />
      <p className="text-white text-sm">{message}</p>
    </div>
  );
}
