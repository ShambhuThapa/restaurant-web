"use client";

import { Fragment } from "react";
import * as React from "react";
import { Transition } from "@headlessui/react";
import { AlertCircleIcon, CheckCircle2Icon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { hammersmith, poppins } from "@/app/layout";

import { Spinner } from "../spinner";

interface IToast {
  onClose?: () => void;
  canClose?: () => void;
  isLoading?: boolean;
  error?: boolean;
  title: string;
  subtitle?: string;
}

export const Toast: React.FC<IToast> = (props) => {
  const {
    onClose,
    canClose,
    isLoading = false,
    error = false,
    title,
    subtitle,
  } = props;

  const { isLoggedIn } = useAuth();

  const fontClass = isLoggedIn
    ? `${poppins.variable} font-mono`
    : `${hammersmith.variable} font-sans`;

  return (
    <>
      <div
        aria-live="assertive"
        className={cn(
          fontClass,
          `pointer-events-none z-[999999999] animate-slideDownAndFade fixed inset-0 lg:mr-16 lg:mt-0 mt-16  flex items-end px-4 py-6 sm:items-start sm:p-6 `
        )}
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={true}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-show100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-primary/90 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {isLoading ? (
                      <Spinner />
                    ) : error ? (
                      <AlertCircleIcon
                        className="h-7 w-7 text-green-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <CheckCircle2Icon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-white">{title}</p>
                    {subtitle && (
                      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                    )}
                  </div>
                  {canClose && (
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex rounded-md text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onClose}
                      >
                        <span className="sr-only">{"Close"}</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
