import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { Tlocation } from "@/lib/validation/locationSchema";

import { baseUrl } from "../dishType/useGetDishType";

const editLocation = async (data: Tlocation) => {
  try {
    const respose = await axios({
      url: baseUrl + `/delivery-location-preference/${data.id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    });
    return respose?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useEditLocation = () => {
  return useMutation({
    mutationFn: (data: any) => editLocation(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("Some error occured");
    },
  });
};
