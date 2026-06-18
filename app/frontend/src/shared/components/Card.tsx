import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}