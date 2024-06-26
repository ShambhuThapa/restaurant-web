import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const markPaymentSuccess = async (id: string) => {
  try {
    const respose = await axios({
      url: baseUrl + `/orders/payment-status/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return respose?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useMarkPaymentSuccess = () => {
  return useMutation({
    mutationFn: (id: string) => markPaymentSuccess(id),
    onSuccess: (data) => {},
    onError: (error) => {
      toast.error("Some error occured");
    },
  });
};
