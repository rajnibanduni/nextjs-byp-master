import { AlertCircle } from "lucide-react";

export default function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 bg-destructive p-3 rounded-md">
      <AlertCircle className="w-5 h-5 text-white" />
      <p className="text-white text-sm">{message}</p>
    </div>
  );
}
