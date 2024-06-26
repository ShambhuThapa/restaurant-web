import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TPopUP } from "@/lib/validation/popUp";

import { baseUrl } from "../dishType/useGetDishType";

const addPopUp = async (data: TPopUP) => {
  try {
    const response = await axios({
      url: baseUrl + "/advertisement-popup",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};
export const useAddPopUp = () => {
  return useMutation({
    mutationFn: (data: TPopUP) => addPopUp(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: () => {
      toast.error(`Some error occured`);
    },
  });
};
