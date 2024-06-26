"use client";

import * as React from "react";
import { UploadIcon } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "..";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  label?: string | null;
  register: UseFormRegister<any>;
  name: string;
  labelClassName?: string;
  errorClassName?: string;
  btnLabel?: string;
  leftIcon?: React.ReactElement;
}

const FileInputButton = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      labelClassName,
      errorClassName,
      type,
      error,
      label,
      btnLabel,
      name,
      leftIcon,
      register,
      ...props
    },
    reff
  ) => {
    const inputRef: any = React.useRef();
    const { ref, ...rest } = register(`${name}`);
    const handleClick = () => {
      inputRef?.current?.click();
    };

    return (
      <div className="flex flex-col gap-y-1 w-full">
        {btnLabel && (
          <label
            htmlFor={name}
            className={cn(
              "text-black leading-6  font-semibold text-base uppercase mb-2",
              labelClassName
            )}
          >
            {btnLabel}
          </label>
        )}
        <div className="relative">
          {leftIcon &&
            React.cloneElement(leftIcon, {
              className: " absolute h-6 w-6 top-3 ml-2 text-gray-500",
            })}
          <input
            type="file"
            id={name}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
            accept="image/*"
            {...rest}
            className={cn(
              " hidden h-12 w-full  border-2 border-gray-300 outline-none  px-3 py-4 text-sm focus:ring-[1px]  focus:border-red-700 focus:ring-red-700  placeholder:text-gray-500 ",
              className,
              error ? "border border-red-500" : "",
              {
                "border-gray-300 disabled:opacity-50": props.readOnly,
                "border border-gray-200 text-gray-900": props.disabled,
                "pl-11": leftIcon,
              }
            )}
            {...props}
          />
          <Button
            label="Upload Image"
            variant={"secondary"}
            size={"lg"}
            type="button"
            onClick={handleClick}
            iconLeft={<UploadIcon size={20} />}
            iconLeftClassName="mr-1"
          />
        </div>
        {error && (
          <p className={cn("text-base text-primary", errorClassName)}>
            *{error}
          </p>
        )}
      </div>
    );
  }
);
FileInputButton.displayName = "Input";

export { FileInputButton };
