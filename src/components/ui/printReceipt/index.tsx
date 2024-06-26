"use client"
import React, { useRef } from "react";
import { Button, Header } from "@/components";
import { PrinterIcon } from "lucide-react";
import ReactToPrint from "react-to-print";

const ReceiptPrinter = ({ data }: any) => {
  const ref: any = useRef<HTMLDivElement>();
  return (
    <>
      <ReactToPrint
        bodyClass="print-receipt"
        content={() => ref.current}
        documentTitle="Order Receipt"
        trigger={() => (
          <div className="flex justify-end mt-7">
            <Button
              className="rounded-md w-auto"
              label={"Print Receipt"}
              variant={"secondary"}
              iconLeft={<PrinterIcon />}
            />
          </div>
        )}
      />

      <section className="hidden">
        <div ref={ref} className="  w-[227px] h-auto">
          <div className="text-center ">
            <h1 className="text-xl font-semibold text-red-500">Sushimerksem</h1>
            <p className="text-xs">Annuntiatenstraat 65, 2170 Merksem</p>
          </div>

          <div>
            {data?.orders?.length ? (
              <div className="my-3 ">
                <div className="flow-root">
                  <ul role="list" className="  divide-y divide-gray-200">
                    {data?.orders.map((dish: any) => (
                      <li key={dish?.id} className="flex py-3">
                        <div className=" flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-gray-900">
                              <Header
                                variant="sm"
                                className="text-lg my-0 font-normal text-gray-800 py-0 normal-case"
                              >
                                {dish?.dish?.name}
                              </Header>
                              <div className="flex flex-col font-base">
                                <p>€{dish?.unitPrice * dish?.quantity}</p>
                              </div>
                            </div>
                          </div>
                          <div className="my-1 flex justify-between items-end">
                            {dish?.isTakeAway ? (
                              <p className="text-gray-600 text-sm flex gap-x-1">
                                Take away discount:{" "}
                                {dish?.dish?.takeAwayDiscount}%
                                <br />
                              </p>
                            ) : (
                              <p className="text-gray-600 text-sm flex gap-x-1">
                                Delivery discount:{" "}
                                {dish?.dish?.deliveryDiscount}%
                              </p>
                            )}
                            <p className="text-gray-600 text-sm flex gap-x-1">
                              Vat: {dish?.dish?.vat}%
                            </p>
                          </div>
                          <div className="flex flex-1 items-center justify-between text-sm pt-0">
                            <div className="flex gap-x-2 items-center">
                              <p className="text-gray-600 flex gap-x-1">
                                Quantity: {dish?.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-red-500">No data...</p>
            )}
          </div>

          <div className="grid  grid-cols-1 gap-y-1 font-medium text-gray-800 border-t border-gray-200">
            <div className=" ">
              <p className="grid  mt-3 grid-cols-2 items-start text-primary">
                <span className=" mr-1">Total Price: </span>
                {data?.totalPrice.toFixed(2)}
              </p>
            </div>
            <p>
              <span className="text-gray-600 mr-1">Client Name:</span>{" "}
              {data?.name}
            </p>
            <p>
              <span className="text-gray-600 mr-1">Email:</span> {data?.email}
            </p>
            <p>
              <span className="text-gray-600 mr-1">Phone Number: </span>
              {data?.phoneNumber}
            </p>
            {data?.community?.locationName && (
              <p>
                <span className="text-gray-600 mr-1">Community: </span>{" "}
                {data?.community?.locationName}{" "}
                {` (${data?.community?.postalCode})`}
              </p>
            )}
            {data?.street && (
              <p>
                <span className="text-gray-600 mr-1">Street: </span>{" "}
                {data?.street}
              </p>
            )}
            {data?.houseNumber ? (
              <p>
                <span className="text-gray-600 mr-1">House Number: </span>
                {data?.houseNumber}
              </p>
            ) : null}
            <p>
              <span className="text-gray-600 mr-1 ">Payment Method: </span>
              <span className="uppercase">{data?.paymentMethod}</span>
            </p>
            <p>
              <span className="text-gray-600 mr-1 ">Payment Status: </span>
              <span className="uppercase">{data?.paymentStatus}</span>
            </p>
            <p>
              <span className="text-gray-600 mr-1 ">Delivery Date: </span>
              <span className="uppercase">{data?.deliveryDate}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReceiptPrinter;
