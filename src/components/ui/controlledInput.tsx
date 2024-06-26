"use client";

import * as React from "react";
import { UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  label?: string | null;
  register: UseFormRegister<any>;
  name: string;
  labelClassName?: string;
  errorClassName?: string;
  leftIcon?: React.ReactElement;
  increment: () => void;
  decrement: () => void;
}

const ControlledInput = React.forwardRef<HTMLInputElement, InputProps>(
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
      increment,
      decrement,
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
        <div className={`relative flex items-center gap-x-2 ${className}`}>
          {leftIcon &&
            React.cloneElement(leftIcon, {
              className: "absolute h-6 w-6 top-3 ml-2 text-gray-500",
            })}
          <input
            type="number"
            id="ControlledInput"
            className={cn(
              "flex h-10 w-full border-none appearance-none outline-none  px-2 py-4 text-sm focus:ring-[1px]  focus:border-gray-200 focus:ring-gray-200  placeholder:text-gray-500 ",
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
          <div className="absolute flex right-1 gap-x-3 px-1 ">
            <button
              type="button"
              onClick={decrement}
              disabled={props?.disabled}
              className=" w-7 h-8  cursor-pointer text-center rounded-sm text-primary border border-gray-200 hover:bg-gray-200 "
            >
              <span className="m-auto text-3xl font-bold">-</span>
            </button>
            <button
              type="button"
              disabled={props?.disabled}
              onClick={increment}
              className=" w-7 h-8  cursor-pointer text-center rounded-sm text-primary border border-gray-200 hover:bg-gray-200 "
            >
              <span className="m-auto text-3xl font-bold">+</span>
            </button>
          </div>
        </div>
        {error && (
          <p className={cn("text-base text-white", errorClassName)}>*{error}</p>
        )}
      </div>
    );
  }
);
ControlledInput.displayName = "ControlledInput";

export { ControlledInput };
