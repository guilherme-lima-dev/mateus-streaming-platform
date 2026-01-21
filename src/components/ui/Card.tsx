import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`bg-gray-800 rounded-lg border border-gray-700 p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
