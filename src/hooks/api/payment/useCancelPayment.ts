import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const cancelPayment = async (id: string) => {
  try {
    const respose = await axios({
      url: baseUrl + `/stripe/${id}`,
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

export const useCancelPayment = () => {
  return useMutation({
    mutationFn: (id: string) => cancelPayment(id),
    onSuccess: (data) => {
      toast.success(`Payment Cancelled !`);
    },
    onError: (error) => {
      toast.error("Some error occured");
    },
  });
};
