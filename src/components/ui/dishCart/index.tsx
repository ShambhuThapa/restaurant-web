"use client";

import { useEffect } from "react";
import { Divider, Header } from "@/components";

import { useGetAllDish } from "@/hooks/api/dish/useGetAllDish";
import { useOrdersContext } from "@/hooks/useOrder";

import DishItems from "./dishItems";

export default function DishCart() {
  const { data, isSuccess } = useGetAllDish("true");
  const { updateOrders } = useOrdersContext();

  useEffect(() => {
    const orderFromLocalStorage = localStorage.getItem("orders");
    if (orderFromLocalStorage && data?.length) {
      let alldish: any = [];
      data?.forEach((val: any) => {
        alldish.push(...val.dish);
      });

      const isItemValid = JSON.parse(orderFromLocalStorage)?.every(
        (el: any) => {
          return alldish?.some((dish: any) => dish.id === el.id);
        }
      );
      if (!isItemValid) {
        localStorage.removeItem("orders");
        updateOrders([]);
      }
    }

    if (!data?.length && isSuccess) {
      localStorage.removeItem("orders");
      updateOrders([]);
    }
  }, [data, isSuccess]);

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-2xl lg:max-w-7xl ">
        <div className="mt-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <ul
              role="list"
              className="    gap-x-4 w-full border-t border p-5 border-gray-200"
            >
              {data?.length ? (
                data?.map((item: any, productIdx: number) => (
                  <div key={item?.dishTypeId} id={item?.dishName} className="">
                    <div className="my-4">
                      <Header variant="md" className="py-0 text-gray-700">
                        {item?.dishName}
                      </Header>
                      <Divider
                        className="my-2 h-[1px] bg-gray-300"
                        variant="full"
                      />
                    </div>
                    {item?.dish?.map((dish: any) => (
                      <div key={dish.id}>
                        <DishItems dish={dish} />
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-primary  font-medium">No dish found...</p>
              )}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
