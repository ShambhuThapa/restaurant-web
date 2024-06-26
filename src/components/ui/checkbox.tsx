"use client";

import * as React from "react";
import Link from "next/link";
import { UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  label?: string | null;
  register: UseFormRegister<any>;
  name: string;
  labelClassName?: string;
  linkLabel?: string;
  link?: string;
  leftLabel?:string;
  rightLabel?:string;
  errorClassName?: string;
  linkClick?: () => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      labelClassName,
      errorClassName,
      type,
      error,
      label,
      name,
      linkLabel,
      link,
      register,
      linkClick,
      leftLabel,
      rightLabel,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-y-1 w- full">
        <div className="flex gap-x-3 items-center ">
          <input
            type="checkbox"
            id={name}
            className={cn(
              "flex p-3 border-2 accent-primary rounded-xl text-primary border-gray-300  text-sm focus:outline-none focus:ring-[2px] focus:ring-red-700  placeholder:text-gray-500 cursor-pointer",
              className,
              error ? "border border-red-500" : "",
              {
                "border-gray-300 disabled:opacity-50": props.readOnly,
                "border border-gray-200 text-gray-900": props.disabled,
              }
            )}
            {...register(`${name}`)}
            {...props}
          />
          {label || linkLabel && (
            <label
              htmlFor={name}
              className={cn(
                "text-white leading-6  font-semibold text-base uppercase ",
                labelClassName
              )}
            >
              {label}
              {linkLabel && (
                <>
                {leftLabel && leftLabel}
                  {linkClick && (
                    <span
                      className="text-green-500 underline underline-offset-2 cursor-pointer"
                      onClick={linkClick}
                    >
                      {linkLabel}
                    </span>
                  )}
                  <Link
                    href={link ? link : "#"}
                    target="_blank"
                    className="text-green-500 underline underline-offset-2  "
                  >
                    {link && !linkClick && <span>{linkLabel}</span>}
                  </Link>
                  {rightLabel&& rightLabel}
                </>
              )}
            </label>
          )}
        </div>
        {error && (
          <p className={cn("text-base text-white", errorClassName)}>*{error}</p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Input";

export { Checkbox };
