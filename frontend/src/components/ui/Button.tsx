import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        "bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500 transition-colors",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:opacity-65",
        className
      )}
    >
      {children}
    </button>
  );
}
