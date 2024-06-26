"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Modal } from "@/components";
import { Dialog, Transition } from "@headlessui/react";
import { Ban, XCircle, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { repalceDotWithComma } from "@/lib/utils";
import { useOrdersContext } from "@/hooks/useOrder";
import { hammersmith } from "@/app/layout";
import PrivacyPolicy from "@/app/privacyPolicy/page";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Header } from "../header";

interface CartProps {
  cartData: any;
  openCart: boolean;
  handleCloseCart: () => void;
}

export default function Cart(props: CartProps) {

  const router = useRouter();
  const {
    totalPrice,
    handleAddQuantity,
    handleSubtractQuantity,
    handleRemoveOrder,
  } = useOrdersContext();

  const { cartData, openCart, handleCloseCart } = props;

  const {
    register,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const handleCheckout = () => {
    if (watch("policy") == true) {
      router.push("/checkout");
    }
  };

  return (
    <>
      <Transition.Root show={openCart} as={Fragment}>
        <Dialog
          as="div"
          className={`${hammersmith.variable} font-sans relative z-[60]`}
          onClose={handleCloseCart}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full lg:pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen lg:max-w-md">
                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {/* Shopping cart */}
                            Winkelwagen
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 hover:text-primary"
                              onClick={handleCloseCart}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XIcon
                                className="h-6 w-6 text-gray-500 hover:text-primary"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        {cartData.length ? (
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {cartData.map((dish: any) => (
                                  <li key={dish?.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <Image
                                        src={
                                          dish?.image
                                            ? dish?.image
                                            : "/icons/imagePlaceholder.png"
                                        }
                                        alt={dish?.image}
                                        width={500}
                                        height={500}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-gray-900">
                                          <Header
                                            variant="sm"
                                            className="text-lg font-normal text-gray-700 py-0 normal-case"
                                          >
                                            {dish?.name}
                                          </Header>
                                          <div className="flex flex-col">
                                            <p>
                                              €
                                              {repalceDotWithComma(
                                                `${dish?.subTotal.toFixed(2)}`
                                              ) ??
                                                repalceDotWithComma(
                                                  `${dish?.price.toFixed(2)}`
                                                )}
                                            </p>
                                          </div>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {dish?.description}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-center justify-between text-sm pt-4">
                                        <div className="flex gap-x-2 items-center">
                                          <p className="text-gray-500 flex gap-x-1">
                                            {/* Quantity */}
                                            Aantal
                                          </p>
                                          <div className="flex gap-x-2 items-center">
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleSubtractQuantity(dish?.id)
                                              }
                                              className=" w-7 h-7  cursor-pointer text-center rounded-md text-gray-600 border border-gray-200 hover:bg-gray-200 "
                                            >
                                              <span className="m-auto text-2xl font-semibold">
                                                -
                                              </span>
                                            </button>
                                            {dish?.quantity}
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleAddQuantity(dish?.id)
                                              }
                                              className=" w-7 h-7  cursor-pointer text-center rounded-md text-gray-600 border border-gray-200 hover:bg-gray-200 "
                                            >
                                              <span className="m-auto text-2xl font-medium">
                                                +
                                              </span>
                                            </button>
                                          </div>
                                        </div>

                                        <div className="flex">
                                          <button
                                            type="button"
                                            className="font-medium text-primary hover:text-primary-600"
                                            onClick={() =>
                                              handleRemoveOrder(dish?.id)
                                            }
                                          >
                                            {/* Remove */}
                                            Verwijderen
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center h-full">
                            <Ban className="text-primary mr-2" />
                            <span className="text-primary">
                              No dish found. Please add dish to shopping cart
                              first..
                            </span>
                          </div>
                        )}
                      </div>
                      {cartData.length ? (
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            {/* <p>Total Price</p> */}
                            <p>Totaal incl. btw</p>
                            <p>€{repalceDotWithComma(`${totalPrice.toFixed(2)}`)}</p>
                          </div>

                          <p className="text-sm text-gray-400 py-2">
                            {/* Discount and taxes calculated at checkout... */}
                            Korting wordt verrekend in volgende stap
                          </p>
                          <div className="py-1">
                            <Checkbox
                              register={register}
                              leftLabel="Ik heb de "
                              rightLabel=" gelezen en ben hiermee akkoord."
                              linkLabel={"privacy policy"}
                              labelClassName="text-gray-500 text-sm"
                              link="/privacyPolicy"
                              name="policy"
                              error={errors?.policy?.message as string}
                            />
                          </div>

                          <div className="mt-6">
                            <Button
                              // label="Checkout"
                              label="Afrekenen"
                              className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm "
                              onClick={handleCheckout}
                              disabled={!watch("policy")}
                            />
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              <button
                                type="button"
                                className="font-medium text-primary ml-1 hover:text-primary-600"
                                onClick={handleCloseCart}
                              >
                                {/* Continue Shopping */}
                                of Verder winkelen
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
