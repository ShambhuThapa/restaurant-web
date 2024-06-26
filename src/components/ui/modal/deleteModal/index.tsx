"use client";

import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";

import { cn } from "@/lib/utils";
import { poppins } from "@/app/layout";

interface IDeleteModal {
  title?: string;
  body?: string;
  show: boolean;
  className?: string;
  onModalClose?: () => void;
  onSubmitHandler: () => void;
}

export const DeleteModal: React.FC<IDeleteModal> = (props) => {
  const {
    title,
    body,
    show = false,
    onSubmitHandler,
    className = "",
    onModalClose,
  } = props;

  const [showModal, setShowModal] = React.useState<boolean>(show);

  React.useEffect(() => setShowModal(show), [show]);
  return (
    <Transition.Root show={showModal} as={React.Fragment}>
      <Dialog
        as="div"
        className={`${poppins.variable} font-mono fixed inset-0 z-[99999] overflow-y-auto animate-slideUpAndFade`}
        onClose={() => {
          if (onModalClose) {
            onModalClose();
          } else {
            setShowModal(false);
          }
        }}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
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
              className={cn(
                "inline-block transform lg:w-[40vw]  rounded-lg bg-white  text-left align-bottom shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl sm:align-middle",
                className
              )}
            >
              <div className=" px-4 pb-4 pt-5 sm:p-7 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {title || "Are you sure you want to delete ?"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {body ||
                          " Are you sure you want to delete. Data will be permanently removed. This action cannot be undone."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" bg-gray-100  rounded-b-lg px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={onSubmitHandler}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={onModalClose}
                  className="mt-3 inline-flex w-full justify-center hover:text-primary rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
