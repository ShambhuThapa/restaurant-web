import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "./useGetAllCoupan";

export const deleteCoupan = async (id: string) => {
  try {
    const response = await axios({
      url: baseUrl + `/coupon/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useDeleteCoupon = () => {
  return useMutation({
    mutationFn: (id: string) => deleteCoupan(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("Something is wrong");
    },
  });
};
