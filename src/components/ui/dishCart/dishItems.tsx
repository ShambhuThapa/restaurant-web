import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components";
import { CheckIcon, CrossIcon, ShoppingCart, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useOrdersContext } from "@/hooks/useOrder";

import { ControlledInput } from "../controlledInput";

const DishItems = ({ dish }: { dish: any }) => {
  const { orders, addOrders } = useOrdersContext();

  const { register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      quantity: "1",
    },
  });

  const quantity = watch("quantity");

  const onAddToCart = (data: any) => {
    addOrders({
      ...dish,
      quantity: parseInt(quantity),
      subTotal: parseInt(quantity) * dish?.price,
    });
    toast.success("Dish added to cart.");
  };

  const increment = () => {
    if (quantity) {
      setValue("quantity", `${parseInt(quantity) + 1}`);
    } else {
      setValue("quantity", `1`);
    }
  };

  const decrement = () => {
    if (quantity && parseInt(quantity) > 1) {
      setValue("quantity", `${parseInt(quantity) - 1}`);
    }
  };
  // console.log(dish);
  const isDisableInput = orders?.some((el) => el?.id === dish?.id);
  return (
    <li key={dish.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <Image
          src={dish?.image ? dish?.image : "/icons/imagePlaceholder.png"}
          alt={dish?.image}
          height={500}
          width={500}
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="  grid sm:grid-cols-2 grid-cols-1 sm:gap-x-6 last:justify-end">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href={dish?.href}
                  className="font-medium text-base text-gray-700 hover:text-gray-800"
                >
                  {dish?.name}
                </a>
              </h3>
            </div>

            <p className="mt-1 text-sm font-medium text-gray-900">
              € {dish?.price}
            </p>

              <p className="text-gray-500 text-sm pt-1">{dish?.description}</p>

            <p className="mt-5 text-sm font-medium text-gray-700">
              Delivery discount : {dish?.deliveryDiscount} %
            </p>
            <p className="mt-1 text-sm font-medium text-gray-700">
              Take away discount : {dish?.takeAwayDiscount} %
            </p>
          </div>

          <div className="mt-1  flex sm:justify-end justify-start sm:py-0 py-3 sm:m-0 -ml-28">
            <div className="">
              <Button
                label="Add to cart"
                type="button"
                className="px-3 w-auto"
                disabled={!dish?.available}
                onClick={handleSubmit(onAddToCart)}
                iconLeft={<ShoppingCart />}
                iconLeftClassName="mb-1 mr-1"
              />
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col justify-between sm:m-0 -ml-28">
          <div className="flex items-center">
            <p className=" flex items-center space-x-2 text-sm text-gray-700">
              {dish?.available ? (
                <CheckIcon
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <XIcon
                  className="h-5 w-5 flex-shrink-0 text-primary"
                  aria-hidden="true"
                />
              )}
            </p>
            <span className="ml-2">
              {dish?.available ? "Available" : `Not available`}
            </span>
          </div>

          <div className="flex  items-center gap-x-2 ">
            <p>Quantity:</p>
            <ControlledInput
              register={register}
              placeholder="0"
              name="quantity"
              className="w-36"
              disabled={isDisableInput}
              increment={increment}
              decrement={decrement}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default DishItems;
