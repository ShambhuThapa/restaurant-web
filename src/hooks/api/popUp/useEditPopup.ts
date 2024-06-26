import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TPopUP } from "@/lib/validation/popUp";

import { baseUrl } from "../dishType/useGetDishType";

const editPopUP = async (data: TPopUP) => {
  try {
    const respose = await axios({
      url: baseUrl + `/advertisement-popup/${data.id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type":"multipart/form-data"
      },
      data: data,
    });
    return respose?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};
export const useEditPopup = () => {
  return useMutation({
    mutationFn: (data: TPopUP) => editPopUP(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: () => {
      toast.error("Some error occured");
    },
  });
};
