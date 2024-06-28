import axios from "axios";

import { baseUrl } from "../blog/useGetBlog";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface IEsewaData {
  amount: number;
  paymentMethod: string;
}

export const postPaymentDetails = async (data: any) => {
    const bodyFormData = new FormData();
    bodyFormData.append("amount",String(data?.amountPaid));
    bodyFormData.append("failure_url",String("https://google.com"));
    bodyFormData.append("product_delivery_charge","0");
    bodyFormData.append("product_service_charge","0");
    bodyFormData.append("product_code","EPAYTEST");
    bodyFormData.append("signature",String(data?.signature));
    bodyFormData.append("signed_field_names",String(data?.signed_field_names));
    bodyFormData.append("success_url","http://localhost:3000/orderStatus/");
    bodyFormData.append("tax_amount","0");
    bodyFormData.append("total_amount",String(data?.amountPaid));
    bodyFormData.append("transaction_uuid",String(data?.orderId));
  try {
    const response = await axios({
      url: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
      method: "POST",
      headers: { 
      "Content-Type": "multipart/form-data",
      },
      data: bodyFormData,
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const useEsewaPayment = () => {
    return useMutation({
      mutationFn: (data: any) => postPaymentDetails(data),
      onSuccess: () => {
          toast.error(
            `Order placed successfully. Confirmation message has been sent to your email.`
          );
      },
      onError: (error) => {
        toast.error(`${error.message || "Some error occured"}`);
      },
    });
  };
