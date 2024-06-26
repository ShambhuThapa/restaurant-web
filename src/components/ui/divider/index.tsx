import React from "react";

import { cn } from "@/lib/utils";

interface IDivider {
  className?: string;
  variant?: "sm" | "md" | "lg" | "full";
  containerClassName?: string;
}

const sizeClassName = {
  sm: "lg:px-40 px-8",
  md: "lg:px-32 px-8",
  lg: "lg:px-20 px-8",
  full: "w-full",
};

export const Divider: React.FC<IDivider> = (props) => {
  const { className, containerClassName, variant = "sm" } = props;

  return (
    <div className={cn("", sizeClassName[variant], containerClassName)}>
      <div
        className={cn(
          "h-[2px] rounded-full w-full my-5 bg-dark-100/90 ",
          className
        )}
      />
    </div>
  );
};
