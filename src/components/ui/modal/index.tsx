"use client";

import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { hammersmith, poppins } from "@/app/layout";

interface IModal {
  title?: string;
  show: boolean;
  className?: string;
  onModalClose?: () => void;
  children: React.ReactNode;
  disableCloseModal?: boolean;
}

export const Modal: React.FC<IModal> = (props: IModal) => {
  const {
    title,
    show = false,
    className = "",
    disableCloseModal = false,
    onModalClose,
    children,
  } = props;

  const { isLoggedIn } = useAuth();
  const [showModal, setShowModal] = React.useState<boolean>(show);

  React.useEffect(() => setShowModal(show), [show]);
  const fontClass = isLoggedIn
    ? `${poppins.variable} font-mono`
    : `${hammersmith.variable} font-sans`;

  return (
    <div className={cn(`${poppins.variable}`, "font-mono ")}>
      <Transition.Root show={showModal} as={React.Fragment}>
        <Dialog
          as="div"
          className={cn(
            `fixed inset-0  z-[99999] overflow-y-auto ${fontClass}`
          )}
          onClose={() => {
            if (onModalClose) {
              !disableCloseModal && onModalClose();
            } else {
              !disableCloseModal && setShowModal(false);
            }
          }}
        >
          <div className="flex  min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-700/50 bg-opacity-80 backdrop-blur-none transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                className={clsx(
                  "inline-block transform  rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl sm:align-middle ",
                  className
                )}
              >
                {title && (
                  <div className="flex justify-center border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-bold leading-6 text-primary-500">
                      {title}
                    </h3>
                  </div>
                )}
                <div className={cn("px-5 h-auto overflow-y-auto", className)}>
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
