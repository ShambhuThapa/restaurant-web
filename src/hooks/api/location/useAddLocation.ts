import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { Tlocation } from "@/lib/validation/locationSchema";

import { baseUrl } from "../dishType/useGetDishType";

const addLocation = async (data: Tlocation) => {
  try {
    const response = await axios({
      url: baseUrl + "/delivery-location-preference",
      method: "POST",
      data: data,
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useAddLocation = () => {
  return useMutation({
    mutationFn: (data: any) => addLocation(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
