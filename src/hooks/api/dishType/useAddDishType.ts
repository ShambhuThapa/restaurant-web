import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TDishType } from "@/lib/validation/dishTypeSchema";

import { baseUrl } from "./useGetDishType";

const addDishType = async (data: TDishType) => {
  try {
    const response = await axios({
      url: baseUrl + "/dish-type",
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

export const useAddDishType = () => {
  return useMutation({
    mutationFn: (data: TDishType) => addDishType(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
