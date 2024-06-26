"use client";
import PaymentForm from "@/components/forms/paymentForm";
import EsewaForm from "@/components/forms/paymentForm/esewa";

export default function PayNow({ orderDetails, closeModal }: any) {
  return <>
    {(orderDetails?.paymentMethod==="esewa")
      && <EsewaForm orderDetails={orderDetails}/> }
  </>

}
