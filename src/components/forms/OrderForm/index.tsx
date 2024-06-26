"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Divider,
  DropDown,
  Header,
  Input,
  Modal,
  Radio,
  TextArea,
} from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, startOfDay, subDays } from "date-fns";
import { SubmitHandler, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  orderSchema,
  orderSchemaTakeOff,
  TOrder,
} from "@/lib/validation/orderschama";
import { useGetFilterLocation } from "@/hooks/api/location/useGetAllLocation";
import { useGetLocation } from "@/hooks/api/location/useGetLocation";
import { useAddOrder } from "@/hooks/api/orders/useAddOrder";
import { useOrdersContext } from "@/hooks/useOrder";
import PayNow from "@/components/ui/payment";
import EsewaForm from "../paymentForm/esewa";

const paymentOptions = [
  { label: "Ter plaatse betalen", value: "cash", iconLeftUrl: "/payment/cash.png" },
  { label: "Esewa", value: "esewa", iconLeftUrl: "/payment/creditcard.png" },
  {
    label: "Khalti",
    value: "khalti",
    iconLeftUrl: "/payment/bancontact.png",
  },
];

const paymentOptionsCash = [
  { label: "Ter plaatse betalen", value: "cash", iconLeftUrl: "/payment/cash.png" },
];

const isDeliveryDefaultValues = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
  community: { label: "", value: "" },
  street: "",
  houseNumber: "",
  couponCode: "",
  deliveryDate: "",
  paymentMethod: { label: "", value: "" },
  isTakeAway: "false",
  isDelivery: "true",
};
const isTakeOffDefaultValues = {
  name: "",
  email: "",
  phoneNumber: "",
  message: "",
  couponCode: "",
  deliveryDate: "",
  paymentMethod: { label: "", value: "" },
  isTakeAway: "false",
  isDelivery: "true",
};

const filterFields = ["community", "street", "houseNumber"];

export const OrderForm = ({ setIsDelivery, isDelivery }: any) => {
  const { orders, totalPrice, updateOrders } = useOrdersContext();
  const { mutate, isSuccess, isPending, data }: any = useAddOrder();
  const { data: locations } = useGetFilterLocation();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    unregister,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<TOrder>({
    resolver: zodResolver(isDelivery ? orderSchema : orderSchemaTakeOff),
    mode: "onBlur",
    defaultValues: isDelivery
      ? isDeliveryDefaultValues
      : isTakeOffDefaultValues,
  });

  const { data: location } = useGetLocation(watch("community")?.value);

  const onSubmit: SubmitHandler<TOrder> = (data) => {
    console.log("first",data);
    if (location && totalPrice && totalPrice < location?.minPrice) {
      setError("community.label", {
        message: `Minimum order for ${location.locationName} is €${location.minPrice}`,
      });
      return;
    }

    if (!data.date) {
      setError("date", {
        message: `*Date is required`,
      });
      return;
    } else if (!data.time) {
      setError("time", {
        message: `*Time is required`,
      });
      return;
    }
    const isDeliveryType =
      data.isDelivery == "false" && data.isTakeAway === "false";

    if (isDeliveryType) {
      setError("address", { message: "Please choose at least one option." });
      return;
    }
    const filteredOrder = orders?.map((el) => ({
      dishId: el.id,
      quantity: el.quantity,
    }));

    if (isDelivery) {
      mutate({
        ...data,
        orders: filteredOrder,
        isTakeAway: data?.isTakeAway === "true",
        isDelivery: data?.isDelivery === "true",
        community: data?.community?.value,
        paymentMethod: data?.paymentMethod?.value,
        houseNumber: Number(data?.houseNumber),
        deliveryDate: new Date(`${data.date} ${data.time}`),
      });
    } else {
      let filteredValue: any = {};

      Object.entries(data)?.forEach(([key, value]) => {
        if (!filterFields?.includes(key)) {
          filteredValue[key] = value;
        }
      });
      mutate({
        ...filteredValue,
        orders: filteredOrder,
        isTakeAway: data?.isTakeAway === "true",
        isDelivery: data?.isDelivery === "true",
        paymentMethod: data?.paymentMethod?.value,
        deliveryDate: new Date(`${data.date} ${data.time}`),
      });
    }
  };

  useMemo(() => {
    if (watch("isDelivery") === "true") {
      setIsDelivery(true);
      setValue("isTakeAway", "false");
    }
  }, [watch("isDelivery")]);

  useMemo(() => {
    if (watch("isTakeAway") === "true") {
      setIsDelivery(false);
      setValue("paymentMethod", { label: "Ter plaatse betalen", value: "cash" });
      setValue("isDelivery", "false");
    }
  }, [watch("isTakeAway")]);

  useEffect(() => {
    if (isSuccess && data?.paymentMethod == "cash") {
      localStorage.removeItem("orderDetails");
      // localStorage.removeItem("orders");
      // updateOrders([]);
      router.push("/orderStatus");
    }

    if (isSuccess && data?.paymentMethod != "cash") {
      localStorage.setItem("orderDetails", JSON.stringify(data));
      setOpenPaymentModal(Boolean(data?.orderId));
    }
  }, [data, isSuccess, setOpenPaymentModal]);

  const closeModal = () => {
    setOpenPaymentModal(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex lg:flex-row flex-col gap-6 ">
          <div className="border w-full border-gray-50 lg:p-4 lg:mt-0 mt-3">
            <Header variant="md" className="text-primary py-0 normal-case">
              Contact Info
            </Header>
            <Divider variant="full" className="mt-3"></Divider>
            <div className="grid lg:grid-cols-2 grid-cols-1 h-auto w-full gap-5 ">
              <Input
                label="Name"
                labelClassName="text-gray-600 normal-case"
                type="text"
                name="name"
                placeholder="Name"
                register={register}
                className="text-dark"
                errorClassName="text-red-500"
                error={errors?.name?.message}
              />
              <Input
                label="Email"
                labelClassName="text-gray-600 normal-case"
                type="email"
                name="email"
                placeholder="Email"
                register={register}
                className="text-dark"
                errorClassName="text-red-500"
                error={errors?.email?.message}
              />

              <Input
                label="Phone number"
                type="number"
                name="phoneNumber"
                placeholder="Phone number"
                register={register}
                className="text-dark"
                errorClassName="text-red-500"
                labelClassName="text-gray-600 normal-case"
                error={errors?.phoneNumber?.message}
              />
              <Input
                label="Company Name (if available)"
                type="text"
                name="companyName"
                placeholder="Company Name"
                register={register}
                className="text-dark"
                labelClassName="text-gray-600 normal-case"
              />
            </div>
            {isDelivery && (
              <Header variant="sm" className="text-primary pb-1 normal-case">
                Address
              </Header>
            )}
            <Divider
              variant="full"
              className={cn("mt-3", {
                "mt-20": !isDelivery,
              })}
            />

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 p-6">
              <Radio
                label="To deliver"
                name="isDelivery"
                value={true}
                register={register}
                labelClassName="p-4 text-gray-600 normal-case"
              />
              <Radio
                labelClassName="p-4 text-gray-600 normal-case"
                label="To take off"
                value={true}
                name="isTakeAway"
                register={register}
              />
              {errors.address && (
                <p className={"text-base mt-4  text-red-500"}>
                  *{errors?.address?.message}
                </p>
              )}
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-auto h-auto">
              {isDelivery && (
                <>
                  <DropDown
                    name="community"
                    label="Community"
                    control={control}
                    options={locations}
                    labelClass="text-gray-600 block"
                    placeholder="Select a community"
                  />
                  <Input
                    label="Street"
                    type="text"
                    className="text-dark"
                    name="street"
                    register={register}
                    error={errors?.street?.message}
                    placeholder="Street"
                    errorClassName="text-red-500"
                    labelClassName="text-gray-600 normal-case"
                  />
                  <Input
                    label={"House Number"}
                    type="number"
                    labelClassName="text-gray-600 normal-case"
                    className="text-dark"
                    name="houseNumber"
                    placeholder="House Number"
                    register={register}
                    errorClassName="text-red-500"
                    error={errors?.houseNumber?.message}
                  />
                </>
              )}
              <DropDown
                label="Payment method"
                name="paymentMethod"
                placeholder="Select payment method"
                labelClass="text-gray-600 block"
                control={control}
                options={!isDelivery ? paymentOptionsCash : paymentOptions}
              />
            </div>
            <Header variant="sm" className="text-primary pb-1 normal-case">
              Delivery time
            </Header>
            <Divider variant="full" className="mt-3"></Divider>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 h-auto w-auto mt-8">
              <Input
                label={"Desired delivery/collection date"}
                type="date"
                labelClassName="text-gray-600 normal-case"
                className="text-dark"
                name="date"
                min={
                  startOfDay(addDays(new Date(), 1)).toISOString().split("T")[0]
                }
                register={register}
                errorClassName="text-red-500"
                error={errors?.date?.message}
              />
              <Input
                label={"Collection time"}
                type="time"
                labelClassName="text-gray-600 normal-case"
                className="text-dark"
                name="time"
                register={register}
                errorClassName="text-red-500"
                error={errors?.time?.message}
              />
              <TextArea
                labelClassName="text-gray-600 normal-case"
                label="Remarks"
                className="text-dark "
                placeholder="Message.."
                name="message"
                register={register}
              />

              <Input
                label={"Coupon code (if available)"}
                type="text"
                labelClassName="text-gray-600 normal-case"
                className="text-dark"
                name="couponCode"
                register={register}
                errorClassName="text-red-500"
              />
            </div>
            {errors?.community?.label?.message?.includes("Minimum") && (
              <p className={"text-base text-red-500 mt-5"}>
                *{errors?.community?.label?.message}
              </p>
            )}
            <Button
              label="Submit"
              isLoading={isPending}
              type="submit"
              className="mt-8 sm:w-1/2 w-full"
            />
          </div>
        </div>
      </form>
      <Modal show={openPaymentModal} disableCloseModal={true}>
        <div className="px-5 py-10">
          {isSuccess && data?.orderId && (
            <PayNow orderDetails={data} closeModal={closeModal} />
          )}
        </div>
      </Modal>
    </>
  );
};
