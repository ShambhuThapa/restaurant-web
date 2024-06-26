import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TDishType } from "@/lib/validation/dishTypeSchema";
import { TOrder } from "@/lib/validation/orderschama";

import { baseUrl } from "../dishType/useGetDishType";

const addOrder = async (data: TOrder) => {
  try {
    const response = await axios({
      url: baseUrl + "/orders",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useAddOrder = () => {
  return useMutation({
    mutationFn: (data: any) => addOrder(data),
    onSuccess: (data) => {
      if (data?.paymentMethod == "cash") {
        toast.error(
          `Order placed successfully. Confirmation message has been sent to your email.`
        );
      } else {
        toast.success(`Please fill up your payment details.`);
      }
    },
    onError: (error) => {
      toast.error(`${error.message || "Some error occured"}`);
    },
  });
};
