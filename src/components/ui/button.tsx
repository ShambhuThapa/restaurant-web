"use client";

import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center w-full  rounded-sm justify-center text-white text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white text-base font-semibold leading-6 hover:bg-primary-600 w-full",
        secondary:
          "bg-white text-dark text-base font-semibold leading-6 border border-gray-300 bg-neutral-100 hover:bg-neutral-200 hover:text-primary ",
        destructive: "",
        outline: "",
        ghost: "",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 lg:py-2 py-6 px-6",
        sm: "h-9 px-3 ",
        lg: "h-11 px-8 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
  iconLeft?: React.ReactElement;
  iconLeftClassName?: string;
  isLoading?: boolean;
  labelClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      label,
      iconLeft,
      iconLeftClassName,
      isLoading = false,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={props?.disabled || isLoading}
        {...props}
      >
        <div className="flex gap-x-1 items-center ">
          {isLoading && <Spinner />}
          {iconLeft &&
            React.cloneElement(iconLeft, {
              className: `h-6 w-6 ${iconLeftClassName}`,
            })}
          <p className={labelClassName}>{label}</p>
        </div>
      </button>
    );
  }
);
Button.displayName = "Button";

const AcceptedButton = (props: any) => {
  return (
    <button
      {...props}
      className="px-2 py-1 bg-green-100 border border-green-200 rounded-md font-semibold text-green-500 hover:bg-green-200"
    >
      Accepted
    </button>
  );
};

const PendingButton = (props: any) => {
  return (
    <button
      {...props}
      className="px-2 py-1 bg-gray-100 border border-gray-300 rounded-md font-semibold text-green-500 hover:bg-gray-300"
    >
      Pending
    </button>
  );
};

const RejectedButton = (props: any) => {
  return (
    <button
      {...props}
      className="px-2 py-1 bg-red-200 border border-red-300 rounded-md font-semibold text-primary hover:bg-red-300"
    >
      Rejected
    </button>
  );
};

const CompletedButton = (props: any) => {
  return (
    <button
      {...props}
      className="px-2 py-1 bg-red-100 border border-red-200 rounded-md font-semibold text-primary hover:bg-red-200"
    >
      Completed
    </button>
  );
};
const SucceededButton = (props: any) => {
  return (
    <button
      {...props}
      className="px-2 py-1 bg-green-100 border border-green-200 rounded-md font-semibold text-green-500 hover:bg-green-200"
    >
      Succeeded
    </button>
  );
};

const IncompleteButton = (props: any) => {
  return (
    
    <button
      {...props}
      className="px-2 py-1 bg-red-100 border border-red-200 rounded-md font-semibold text-primary hover:bg-red-200"
    >
      Incomplete
    </button>
  );
};

export {
  Button,
  buttonVariants,
  AcceptedButton,
  RejectedButton,
  PendingButton,
  CompletedButton,
  SucceededButton,
  IncompleteButton
};
