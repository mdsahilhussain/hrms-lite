import React from "react";
import { cn } from "../../lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm border border-gray-200 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}