import React from "react";

import { cn } from "@/lib/utils";

interface IErrorMessage {
  className?: string;
  variant?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantClassName = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
};

export const ErrorMessage: React.FC<IErrorMessage> = (props) => {
  const { className, variant = "md", children } = props;

  if (!children) return;

  return (
    <p
      className={cn(
        "text-primary text-base  text-left",
        variantClassName[variant]
      )}
    >
      *{children}
    </p>
  );
};
