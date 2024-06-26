"use client";

import * as React from "react";
import { UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | null;
  label?: string | null;
  rows?: number;
  cols?: number;
  name: string;
  errorClassName?: string;
  register: UseFormRegister<any>;
  labelClassName?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      errorClassName,
      className,
      cols,
      rows,
      error,
      label,
      name,
      draggable,
      register,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-y-1 ">
        <label
          htmlFor={name}
          className={cn(
            "text-white leading-6 font-semibold text-base uppercase mb-2",
            labelClassName
          )}
        >
          {label}
        </label>
        <textarea
          id={name}
          rows={rows}
          cols={cols}
          draggable
          className={cn(
            "flex border-1 border-gray-300  px-3 py-4 focus:border-red-700 text-sm focus:outline-none focus:ring-[1px] focus:ring-red-700  placeholder:text-gray-500  ",
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
        {error && (
          <p className={cn("text-base text-white", errorClassName)}>
            *{error}
          </p>
        )}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export { TextArea };
