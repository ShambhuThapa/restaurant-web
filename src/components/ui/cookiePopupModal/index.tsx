"use client";

import * as React from "react";
import { Button } from "@/components";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { XIcon } from "lucide-react";
import ReactDOM from "react-dom";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { hammersmith, poppins } from "@/app/layout";

interface ICookieModal {
  open: boolean;
  onClose: () => void;
}

export const CookieModal: React.FC<ICookieModal> = ({
  open = false,
  onClose,
}) => {
  const { isLoggedIn } = useAuth();

  const fontClass = isLoggedIn
    ? `${poppins.variable} font-mono`
    : `${hammersmith.variable} font-sans`;

  const handleCookieAccept = () => {
    localStorage.setItem("isCookie", "true");
    onClose();
  };

  const handleCookieReject = () => {
    localStorage.setItem("isCookie", "false");
    onClose();
  };

  return (
    <>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className={cn(`relative z-10 ${fontClass} `)}
          onClose={onClose}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className=" inset-0 bg-red-500 bg-opacity-80 backdrop-blur-none transition-opacity" />
          </Transition.Child>

          <div className="fixed lg:top-[45%] top-[30%] inset-0 ">
            <div className="flex min-h-full  p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className=" h-auto  w-full transform overflow-hidden bg-lightGray text-left shadow-xl transition-all">
                  <div
                    className={clsx(
                      "relative inline-block transform py-8 px-6 pt-10 rounded-lg bg-dark/80 text-left align-bottom shadow-xl transition-all  lg:w-[25vw] w-full  sm:align-middle "
                    )}
                  >
                    <XIcon
                      size={30}
                      className="absolute z-50 right-4 top-2 cursor-pointer text-white"
                      onClick={handleCookieReject}
                    />
                    <h1 className="text-xl text-gray-100 font-semibold pb-6">
                      Deze website maakt gebruik van cookies.
                    </h1>

                    <div className={cn(" h-auto text-gray-300")}>
                      We maken gebruik van cookies om je bezoek aan
                      sushimerksem.be makkelijker en persoonlijker te maken.
                      Door op ‘accepteren’ te klikken ga je hiermee akkoord.
                    </div>
                    <div className=" flex lg:flex-row flex-col-reverse  gap-4 pt-5 ">
                      <Button
                        type="button"
                        label="Not now"
                        variant={"secondary"}
                        className="rounded-md "
                        onClick={handleCookieReject}
                      />
                      <Button
                        label={"Accepteren"}
                        type="submit"
                        onClick={handleCookieAccept}
                        className=" rounded-md "
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
