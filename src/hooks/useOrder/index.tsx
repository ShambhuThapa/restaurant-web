"use client";

import * as React from "react";
import { toast } from "react-hot-toast";

interface IDish {
  id: string;
  name: string;
  description: string;
  price: number;
  subTotal?: number;
  isSupplement: boolean;
  deliveryDiscount: number;
  takeAwayDiscount: number;
  available: boolean;
  eatIn: boolean;
  supplement: string[];
  takeAway: boolean;
  vat: number;
  dishTypeId: string;
  quantity: number;
}

interface IOrderContext {
  orders: IDish[];
  totalPrice: number;
  addOrders: (data: IDish) => void;
  updateOrders: (data: IDish[]) => void;
  handleAddQuantity: (id: string) => void;
  handleSubtractQuantity: (id: string) => void;
  handleRemoveOrder: (id: string) => void;
  setIsDelivery: any;
  deliveryDiscount: number;
  takeAwayDiscount: number;
  vat: number;
}
const OrderContext = React.createContext<IOrderContext | any>({});

export const OrdersProvider = (props: any) => {
  const [orders, setOrders] = React.useState<IDish[]>([]);

  const addOrders = (data: IDish) => {
    const hasItem =
      orders && orders?.length && orders.some((el: IDish) => el.id === data.id);

    if (hasItem) {
      toast.error("Dish already exists in cart.");
      return;
    } else {
      setOrders((prev: any) => [...prev, data]);
      localStorage.setItem("orders", JSON.stringify([...orders, data]));
    }
  };

  const updateOrders = (data: IDish[]) => {
    setOrders(data);
    localStorage.setItem("orders", JSON.stringify(data));
  };

  const handleAddQuantity = (id: string) => {
    const isAlreadyExists = orders?.find((c) => c?.id === id);
    if (isAlreadyExists) {
      const updatedCart = orders?.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            quantity: c.quantity + 1,
            subTotal: (c.quantity + 1) * c.price,
          };
        }
        return c;
      });
      updateOrders(updatedCart);
    }
  };

  const handleSubtractQuantity = (id: string) => {
    const updatedCartData = orders?.map((c) => {
      if (c.quantity > 1 && c.id === id) {
        return {
          ...c,
          quantity: c.quantity - 1,
          subTotal: c.price * (c.quantity - 1),
        };
      }

      return c;
    });
    updateOrders(updatedCartData);
  };

  const handleRemoveOrder = (id: string) => {
    const updatedCartData = orders?.filter((c) => c.id !== id);
    updateOrders(updatedCartData);
  };

  const totalPrice = orders.reduce(
    (acc: number, item: any) => (acc += item?.subTotal),
    0
  );

  const takeAwayDiscount = orders.reduce(
    (acc: number, item: any) =>
      (acc += (item?.takeAwayDiscount / 100) * item?.price * item?.quantity),
    0
  );
  const deliveryDiscount = orders.reduce(
    (acc: number, item: any) =>
      (acc += (item?.deliveryDiscount / 100) * item?.price * item?.quantity),
    0
  );

  const vat = orders.reduce(
    (acc: number, item: any) =>
      (acc += (item?.vat / 100) * (item?.price * item?.quantity)),
    0
  );

  React.useEffect(() => {
    if (!orders?.length && localStorage.getItem("orders")) {
      const orderFormLocalStorage = JSON.parse(
        localStorage.getItem("orders") as any
      );
      orderFormLocalStorage?.length && setOrders(orderFormLocalStorage);
    }
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        totalPrice,
        vat,
        takeAwayDiscount,
        deliveryDiscount,
        updateOrders,
        addOrders,
        handleAddQuantity,
        handleSubtractQuantity,
        handleRemoveOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export function useOrdersContext() {
  const context = React.useContext<IOrderContext>(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within the AppProvider");
  }

  return context;
}
