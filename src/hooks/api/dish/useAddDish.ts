import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TDish } from "@/lib/validation/dishSchema";

import { baseUrl } from "../dishType/useGetDishType";

const addDish = async (data: TDish) => {
  try {
    const response = await axios({
      url: baseUrl + "/dish",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error: any) {
    Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useAddDish = () => {
  return useMutation({
    mutationFn: (data: TDish | any) => addDish(data),
    onSuccess: (data: any) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
