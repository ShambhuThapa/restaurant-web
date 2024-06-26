"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Divider, Header, Input } from "@/components";
import { ArrowBigLeft, Trash2 } from "lucide-react";

import { repalceDotWithComma } from "@/lib/utils";
import { useOrdersContext } from "@/hooks/useOrder";
import { OrderForm } from "@/components/forms";

const Page = () => {
  const router = useRouter();
  const {
    orders,
    totalPrice,
    vat,
    deliveryDiscount,
    takeAwayDiscount,
    handleAddQuantity,
    handleSubtractQuantity,
    handleRemoveOrder,
  } = useOrdersContext();

  const [isDelivery, setIsDelivery] = useState();

  const discount = isDelivery ? deliveryDiscount : takeAwayDiscount;

  const grandTotal = totalPrice - discount;

  const goToOrder = () => {
    router.push("/order");
  };

  useEffect(() => {
    if (!orders?.length) {
      goToOrder();
    }
  }, [orders]);

  let noOfSupp = 0;

  orders?.length &&
    orders?.forEach((el) => {
      el?.supplement?.length &&
        el.supplement?.forEach((supp) => {
          noOfSupp++;
        });
    });
    
  return (
    <div className="h-auto bg-gray-200 pb-5 pt-12 ">
      <div className="bg-dark w-full h-[9rem]"></div>
      <div className="lg:p-5 p-2 ">
        <div className="bg-white w-full  rounded-md flex lg:flex-row flex-col gap-x-16 lg:px-4 px-2 py-4 pb-10">
          <div className="flex-1 overflow-y-auto h-[165vh] bg-gray-50 border border-gray-200 drop-shadow-md px-4 lg:pb- pb-7 lg:mb-0 mb-3 lg:w-[25rem]   rounded">
            <Header
              variant="md"
              className="text-primary text-center normal-case"
            >
              {/* Order Summary */}
              Jou winkelwagen
            </Header>

            {orders.length ? (
              <div className="mt-8 ">
                <div className="flow-root">
                  <ul
                    role="list"
                    className="lg:-my-8 -my-10 divide-y divide-gray-200"
                  >
                    {orders.map((dish: any) => (
                      <li key={dish?.id} className="flex py-6">
                        <div className="ml-2 flex flex-1 flex-col">
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
                                  {repalceDotWithComma(`${dish?.subTotal}`) ??
                                    repalceDotWithComma(`${dish?.price}`)}
                                </p>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {dish?.description}
                            </p>
                          </div>
                          <div className="my-2 flex justify-between items-end">
                            {isDelivery ? (
                              <p className="text-gray-500 text-sm flex gap-x-1">
                                Korting (Levering): {dish?.deliveryDiscount}%
                                {/* Delivery discount: {dish?.deliveryDiscount}% */}
                              </p>
                            ) : (
                              <p className="text-gray-500 text-sm flex gap-x-1">
                                Korting (Afhaal): {dish?.takeAwayDiscount}%{" "}
                                {/* Take away discount: {dish?.takeAwayDiscount}%{" "} */}
                              </p>
                            )}
                            <p className="text-gray-500 text-sm flex gap-x-1">
                              {/* Vat: {dish?.vat}% */}
                              Btw: {dish?.vat}%
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
                                <span className="text-gray-900">
                                  {dish?.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddQuantity(dish?.id)}
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
                                onClick={() => handleRemoveOrder(dish?.id)}
                              >
                                <Trash2 size={20} className="text-primary" />
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
              <p className="text-red-500">
                No data. please add dish to shopping cart first..
              </p>
            )}
            <Divider variant="full" className="h-[1px] bg-primary-100" />
            <div className="">
              <div className="flex justify-between items-center text-base font-medium text-gray-900">
                {/* <p>Sub Total</p> */}
                <p>Subtotaal incl. btw</p>
                <p className="text-lg  text-gray-700">
                  €{repalceDotWithComma(`${totalPrice.toFixed(2)}`)}
                </p>
              </div>
              <div className="flex justify-between items-center text-base font-medium text-gray-900">
                {/* <p>VAT</p> */}
                <p>Btw</p>

                <p className="text-lg text-gray-700">
                  €{repalceDotWithComma(`${vat.toFixed(2)}`)}
                </p>
              </div>
              <div className="flex justify-between items-center text-base font-medium text-gray-900">
                {/* <p>Discount</p> */}
                <p>Korting</p>
                <p className="text-lg text-gray-700">
                  €{repalceDotWithComma(`${discount.toFixed(2)}`)}
                </p>
              </div>

              <Divider variant="full" className="bg-gray-300" />
              <div className="flex justify-between items-center text-base font-medium text-gray-900">
                {/* <p>Grand Total</p> */}
                <p>Totaal incl. btw</p>

                <p className="text-xl text-primary">
                  €
                  {grandTotal &&
                    repalceDotWithComma(`${grandTotal.toFixed(2)}`)}
                </p>
              </div>

              <button
                onClick={goToOrder}
                className="text-primary text-center flex items-center gap-1 	 mt-5"
              >
                <ArrowBigLeft size={28} className="text-gray-600" />
                <span className="text-center mt-1 border-b border-primary">
                  {/* Go back to menu */}
                  Terug naar de hoofdmenu
                </span>
              </button>
            </div>
            <div>
              {noOfSupp && (
                <Header
                  variant="sm"
                  className="text-primary text-center normal-case pb-3"
                >
                  Supplements
                </Header>
              )}
              <div>
                {orders?.length &&
                  (orders as any).map((order: any) => {
                    return (
                      <ul key={order.id}>
                        {order?.supplement?.length &&
                          order?.supplement?.map((supp: any) => {
                            return (
                              <li
                                key={supp}
                                className="text-gray-700 list-disc ml-10"
                              >
                                {supp}
                              </li>
                            );
                          })}
                      </ul>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex-[2]">
            <OrderForm setIsDelivery={setIsDelivery} isDelivery={isDelivery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
