"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCancelPayment } from "@/hooks/api/payment/useCancelPayment";

export default function PaymentForm(props: any) {

  const router = useRouter();
  const [isPayPending, setIsPayPending] = useState(false);
  const [isElementReady, setIsElementReady] = useState(false);

  const { mutate, isSuccess } = useCancelPayment();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPayPending(true);


    setIsPayPending(false);

  };

  const cancelPayment = () => {
    mutate(props?.paymentId);
  };

  useEffect(() => {
    if (isSuccess) {
      props?.closeModal();
    }
  }, [isSuccess]);

  return (
  <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
 <input type="text" id="amount" name="amount" placeholder="amount" required/>
 <input type="text" id="tax_amount" name="tax_amount" placeholder="tax amount" value ="0" required/>
 <input type="text" id="total_amount" name="total_amount" placeholder="total_amount" required/>
 <input type="text" id="transaction_uuid" name="transaction_uuid"required/>
 <input type="text" id="product_code" name="product_code" value ="EPAYTEST" required/>
 <input type="text" id="product_service_charge" name="product_service_charge" value="0" required/>
 <input type="text" id="product_delivery_charge" name="product_delivery_charge" value="0" required/>
 <input type="text" id="success_url" name="success_url" value="https://esewa.com.np" required/>
 <input type="text" id="failure_url" name="failure_url" value="https://google.com" required/>
 <input type="text" id="signed_field_names" name="signed_field_names" value="total_amount,transaction_uuid,product_code" required/>
 <input type="text" id="signature" name="signature" placeholder="signature" required/>
 <input value="Submit" type="submit"/>
 </form>
  );
}
