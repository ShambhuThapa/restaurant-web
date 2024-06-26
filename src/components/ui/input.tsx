"use client";

import * as React from "react";
import { MailIcon } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  label?: string | null;
  register: UseFormRegister<any>;
  name: string;
  labelClassName?: string;
  errorClassName?: string;
  leftIcon?: React.ReactElement;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      labelClassName,
      errorClassName,
      type,
      error,
      label,
      name,
      leftIcon,
      register,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-y-1 w-full">
        {label && (
          <label
            htmlFor={name}
            className={cn(
              "text-white leading-6  font-semibold text-base uppercase mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon &&
            React.cloneElement(leftIcon, {
              className: "absolute h-6 w-6 top-3 ml-2 text-gray-500",
            })}
          <input
            type={type}
            id={name}
            className={cn(
              "flex h-12 w-full  border-1 border-gray-300 outline-none  px-3 py-4 text-sm focus:ring-[1px]  focus:border-red-700 focus:ring-red-700  placeholder:text-gray-500 ",
              className,
              error ? "border border-red-500" : "",
              {
                "border-gray-300 disabled:opacity-50": props.readOnly,
                "border border-gray-200 text-gray-900": props.disabled,
                "pl-11": leftIcon,
              }
            )}
            {...register(`${name}`)}
            {...props}
          />
        </div>
        {error && (
          <p className={cn("text-base text-white", errorClassName)}>*{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
