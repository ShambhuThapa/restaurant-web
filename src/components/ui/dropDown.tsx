"use client";

import { Fragment } from "react";
import * as React from "react";
import Image from "next/image";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
  iconLeftUrl?: string;
}

interface IDropDown {
  label?: string;
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  className?: string;
  labelClass?: string;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const ListBox = React.forwardRef<
  ControllerRenderProps<FieldValues, string>,
  IDropDown
>((props, ref) => {
  const {
    label,
    options,
    error,
    onChange,
    placeholder,
    className = "",
    labelClass = "",
    ...args
  } = props;

  return (
    <div className={`flex-1  gap-y-1 w-full ${className}`}>
      <Listbox
        value={args?.value}
        className={"w-full "}
        onChange={onChange}
        as={"button"}
        type="button"
        {...args}
      >
        <div
          className={cn(
            "text-white leading-6 text-start font-semibold text-base uppercase mb-3",
            labelClass,
            {
              hidden: !label,
            }
          )}
        >
          <Listbox.Label>{label}</Listbox.Label>
        </div>

        <div className="relative ">
          <Listbox.Button
            className={cn(
              "relative h-12 w-full cursor-pointer  bg-white border border-gray-300   px-4  text-left shadow-sm focus:ring-[2px] focus:ring-red-700  sm:text-sm",
              className
            )}
            type="button"
          >
            <span
              className={cn("block truncate text-black", {
                "text-gray-500": !args?.value?.value,
              })}
            >
              {args?.value?.label || placeholder || "Select a item"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDownIcon
                className="h-6 w-6 text-gray-900 -ml-5"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-200"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options?.map((el, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={`relative cursor-default text-start select-none py-2 pl-10 pr-4 ui-active:bg-primary-300 ui-active:text-white ui-selected:text-primary  text-gray-900 `}
                  value={el}
                >
                  <div className="flex gap-x-2 items-center">
                    {el?.iconLeftUrl && (
                      <Image
                        height={100}
                        width={100}
                        alt="paymentIcon"
                        src={el?.iconLeftUrl}
                        className="h-10 w-10 -ml-4"
                      />
                    )}
                    <span
                      className={cn(
                        `block truncate ui-active:font-medium font-normal pl-1 ui-selected:font-bold`
                      )}
                    >
                      {el.label}
                    </span>
                  </div>
                  <span className="absolute inset-y-0 left-0  items-center px-3 ui-selected:flex hidden ui-selected:text-primary ui-active:text-white">
                    <CheckIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
        {error && (
          <p className="text-base text-start text-red-500 mt-4">*{error}</p>
        )}
      </Listbox>
    </div>
  );
});

export const DropDown: React.FC<IDropDown> = (props) => {
  const {
    name,
    control,
    label,
    options,
    placeholder,
    className,
    labelClass,
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <ListBox
            label={label}
            placeholder={placeholder}
            options={options}
            className={className}
            labelClass={labelClass}
            error={error && (error as any)?.label?.message}
            {...field}
            {...rest}
          />
        );
      }}
    />
  );
};
