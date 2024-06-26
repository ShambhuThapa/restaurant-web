"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Divider, Header } from "@/components";
import { ShoppingCartIcon } from "lucide-react";

import { cn, repalceDotWithComma } from "@/lib/utils";
import { useGetAllDishType } from "@/hooks/api/dishType/useGetAllDishType";
import { useOrdersContext } from "@/hooks/useOrder";
import Cart from "@/components/ui/cart";
import DishCart from "@/components/ui/dishCart";

const Page = () => {
  const { orders } = useOrdersContext();

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [selectedType, setSlectedType] = useState<any>({});

  const { data } = useGetAllDishType();

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleDishClick = (data: any) => {
    setSlectedType(data);
  };

  return (
    <div>
      <div className="pt-[82px] ">
        <div
          onClick={handleOpenCart}
          className="w-[3rem] h-[3rem] rounded-full bg-primary flex justify-center items-center fixed lg:right-6 right-10 top-40 lg:top-16 z-50 cursor-pointer"
        >
          <ShoppingCartIcon className="text-white" />

          <div className="w-[25px] h-[25px] z-50 rounded-full bg-blue-500 text-white flex items-center justify-center absolute -left-4">
            <span className="">{orders?.length}</span>
          </div>
        </div>

        <div className="bg-dark w-full pt-10 h-[7rem]"></div>
        <div className="flex lg:flex-row flex-col  gap-x-6 bg-gray-100  lg:p-5 p-2 relative">
          {/* dish types */}
          <section className=" text-dark lg:w-[20rem] p-5 h-[80vh] overflow-y-auto   lg:sticky  lg:top-20">
            <Header variant="lg" className="py-0 text-primary-400">
              {/* Dish Types */}
              Categorieën gerechten
            </Header>
            <Divider variant="full" className="h-[1px] my-2 bg-gray-300" />

            <ul className="flex flex-col gap-1 ">
              {data?.map((types: any) => (
                <Link
                  key={types.id}
                  href={`#${types.name}`}
                  onClick={() => handleDishClick(types)}
                  className={cn(
                    `p-2 pl-0 cursor-pointer text-gray-700 border-gray-100 border-b hover:border-primary-200  hover:text-primary  `,
                    {
                      " text-primary": selectedType.id === types.id,
                    }
                  )}
                >
                  {types.name}
                </Link>
              ))}
            </ul>
          </section>

          <section className="bg-white text-primary-400   shadow-md lg:w-[70rem] rounded lg:p-5 p-2">
            <Header variant="lg" className="py-0 pb-3">
              {/* Dishes */}
              Gerechten
            </Header>

            <Divider
              variant="full"
              className="h-[1px] bg-gray-300 py-0 my-0  mt-1"
            />
            <DishCart />
          </section>
        </div>
      </div>

      <Cart
        cartData={orders}
        openCart={openCart}
        handleCloseCart={handleCloseCart}
      />
    </div>
  );
};

export default Page;
