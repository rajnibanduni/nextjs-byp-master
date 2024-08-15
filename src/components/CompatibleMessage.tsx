"use client";
import { motion } from "framer-motion";
import { BadgeCheck, CircleX } from "lucide-react";

export default function CompatibleMessage({
  isCompatible = true,
}: {
  isCompatible?: boolean;
}) {
  return (
    <motion.div
      transition={{ duration: 0.3 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      {isCompatible ? (
        <div className="flex items-center space-x-2">
          <BadgeCheck className="text-successDark" size={18} />
          <span className="ml-2 italic text-successDark text-sm">
            This part fits with your vehicle.
          </span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <CircleX className="text-red-500" size={18} />
          <span className="ml-2 italic text-red-500 text-sm">
            This part does not fit with your vehicle.
          </span>
        </div>
      )}
    </motion.div>
  );
}
