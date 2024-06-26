import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  AcceptedButton,
  Button,
  CompletedButton,
  Divider,
  Header,
  IncompleteButton,
  Input,
  Modal,
  PendingButton,
  RejectedButton,
  SucceededButton,
  TextArea,
} from "@/components";
import { OrderStatus } from "@/enum";
import { ArrowLeftIcon, PrinterIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { useGetOrder } from "@/hooks/api/orders/useGetOrder";
import { useUpdateOrderStatus } from "@/hooks/api/orders/useUpdateOrderStatus";

import ReceiptPrinter from "../printReceipt";

const OrdersDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openReceipt, setOpenReceipt] = useState(false);
  const router = useRouter();
  const params: any = useParams();

  const { data } = useGetOrder(params.id);
  const { mutate, isPending } = useUpdateOrderStatus();

  const goBack = () => {
    router.push("/orders");
  };
  const { register, handleSubmit } = useForm<{ remarks: string }>();

  const handleRejectOrder = () => {
    mutate({
      id: params?.id,
      orderStatus: OrderStatus.REJECTED,
    });
    goBack();
  };

  const handleAcceptOrder = (data: any) => {
    mutate({
      id: params?.id,
      orderStatus: OrderStatus.ACCEPTED,
      remarks: data?.remarks,
    });
    goBack();
  };

  const handleCompletedOrder = () => {
    mutate({
      id: params?.id,
      orderStatus: OrderStatus.COMPLETED,
    });
    goBack();
  };

  const closeOrderStatusModal = () => {
    setOpenModal(false);
  };

  const openReceiptModal = () => {
    setOpenReceipt(true);
  };

  return (
    <div className="relative">
      <div className="absolute right-7">
        <button
          onClick={goBack}
          className="font-semibold px-5 py-1 flex gap-x-2 hover:underline hover:text-primary"
        >
          <ArrowLeftIcon size={25} />
          Go Back
        </button>
      </div>

      <Header className="py-0 ">Order Details</Header>
      <Divider className="py-0  bg-gray-300" variant="full" />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 font-semibold text-gray-800">
        <p>
          <span className="text-gray-600 mr-1">Name:</span> {data?.name}
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
            <span className="text-gray-600 mr-1">Street: </span> {data?.street}
          </p>
        )}
        {data?.houseNumber ? (
          <p>
            <span className="text-gray-600 mr-1">House Number: </span>
            {data?.houseNumber}
          </p>
        ) : null}
        <p>
          <span className="text-gray-600 mr-1 ">Payment method: </span>
          <span className="uppercase">{data?.paymentMethod}</span>
        </p>
        <p>
          <span className="text-gray-600 mr-1">Message: </span>: {data?.message}
        </p>

        <div className=" mt-3 sm:w-1/2">
          <p className="grid grid-cols-2 items-start">
            <span className="text-gray-600 mr-1">Discount: </span>
            {data?.discountAmount.toFixed(2)}
          </p>
          <p className="grid grid-cols-2 items-start">
            <span className="text-gray-600 mr-1">Vat: </span>
            {data?.vatAmount?.toFixed(2)}
          </p>
          <p className="grid grid-cols-2 items-start text-primary">
            <span className=" mr-1">Total Price: </span>
            {data?.totalPrice.toFixed(2)}
          </p>
        </div>
        <p>
          <span className="text-gray-600 mr-1">Order Status: </span>
          {data?.orderStatus === OrderStatus.ACCEPTED && <AcceptedButton />}
          {data?.orderStatus === OrderStatus.REJECTED && <RejectedButton />}
          {data?.orderStatus === OrderStatus.PENDING && <PendingButton />}
          {data?.orderStatus === OrderStatus.COMPLETED && <CompletedButton />}
        </p>

        {data?.paymentMethod != "cash" ? (
          <p>
            <span className="text-gray-600 mr-1">Payment Status: </span>
            {data?.paymentStatus === OrderStatus.ACCEPTED && <AcceptedButton />}
            {data?.paymentStatus === OrderStatus.REJECTED && <RejectedButton />}
            {data?.paymentStatus === OrderStatus.PENDING && <PendingButton />}
            {data?.paymentStatus === OrderStatus.COMPLETED && (
              <CompletedButton />
            )}
            {data?.paymentStatus === OrderStatus.SUCCEEDED && (
              <SucceededButton />
            )}
            {data?.paymentStatus === OrderStatus.INPOMPLETED && (
              <IncompleteButton />
            )}
            {data?.paymentStatus === OrderStatus.INPOMPLETE && (
              <IncompleteButton />
            )}
          </p>
        ) : null}
      </div>

      <Header className="pb-0 text-gray-700" variant="sm">
        Orders
      </Header>
      <Divider className="py-0  bg-gray-300" variant="full" />

      {data?.orders?.length ? (
        <div className="my-8 ">
          <div className="flow-root">
            <ul
              role="list"
              className="lg:-my-8 -my-10 divide-y divide-gray-200"
            >
              {data?.orders.map((dish: any) => (
                <li key={dish?.id} className="flex py-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={
                        dish?.dish?.image
                          ? dish?.dish?.image
                          : "/icons/imagePlaceholder.png"
                      }
                      alt={"dish image"}
                      width={500}
                      height={500}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-gray-900">
                        <Header
                          variant="sm"
                          className="text-lg font-normal text-gray-800 py-0 normal-case"
                        >
                          {dish?.dish?.name}
                        </Header>
                        <div className="flex flex-col font-base">
                          <p>€{dish?.unitPrice * dish?.quantity}</p>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {dish?.description}
                      </p>
                    </div>
                    <div className="my-4 flex justify-between items-end">
                      {dish?.isTakeAway ? (
                        <p className="text-gray-600 text-sm flex gap-x-1">
                          Take away discount: {dish?.dish?.takeAwayDiscount}%
                          <br />
                        </p>
                      ) : (
                        <p className="text-gray-600 text-sm flex gap-x-1">
                          Delivery discount: {dish?.dish?.deliveryDiscount}%
                        </p>
                      )}
                      <p className="text-gray-600 text-sm flex gap-x-1">
                        Vat: {dish?.dish?.vat}%
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-between text-sm pt-4">
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

      <ReceiptPrinter data={data} />

      {data?.orderStatus === OrderStatus.PENDING && (
        <div className="flex lg:flex-row flex-col-reverse gap-4 mt-10">
          <Button
            label="Reject"
            variant={"secondary"}
            type="button"
            className="rounded-md"
            isLoading={isPending}
            onClick={handleRejectOrder}
          />
          <Button
            className="rounded-md"
            label={"Accept"}
            isLoading={isPending}
            onClick={() => setOpenModal(true)}
          />
        </div>
      )}
      {data?.orderStatus === OrderStatus.ACCEPTED && (
        <div className="flex justify-center mt-10">
          <Button
            className="rounded-md w-auto"
            label={"Mark Order Completed"}
            isLoading={isPending}
            onClick={handleCompletedOrder}
          />
        </div>
      )}

      <Modal
        show={openModal}
        onModalClose={closeOrderStatusModal}
        title="Order Remarks"
      >
        <form onSubmit={handleSubmit(handleAcceptOrder)}>
          <div className="w-full pb-10 p-5 flex flex-col  gap-y-7">
            <div>
              <TextArea
                label="Remarks"
                labelClassName="text-black"
                name="remarks"
                placeholder="Remarks"
                className="w-full"
                register={register}
              />
            </div>

            <Button label="Submit" isLoading={isPending} />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default OrdersDetails;
