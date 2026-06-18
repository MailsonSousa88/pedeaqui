import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "w-full rounded-xl px-4 py-4 text-base font-semibold transition";

  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}