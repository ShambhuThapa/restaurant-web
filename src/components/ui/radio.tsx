"use client";

import React from "react";
import { UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

interface IRadio {
  label: string;
  labelClassName?: string;
  register: UseFormRegister<any>;
  name: string;
  [x: string]: any;
}

export const Radio = (prop: IRadio) => {
  const { label, labelClassName, register, name, ...args } = prop;

  return (
    <div>
      <input
        className={cn(
          "h-5 w-5 border-gray-300 text-primary focus:ring-primary"
        )}
        type="radio"
        {...register(`${name}`)}
        {...args}
      />
      <label htmlFor={name} className={cn("text-dark", labelClassName)}>
        {label}
      </label>
    </div>
  );
};
