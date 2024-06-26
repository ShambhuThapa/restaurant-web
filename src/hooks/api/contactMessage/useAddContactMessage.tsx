import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { IContact } from "@/lib/validation/contactSchema";

import { baseUrl } from "../dishType/useGetDishType";

const addContactMessage = async (data: IContact) => {
  try {
    const response = await axios({
      url: baseUrl + "/contact-message",
      method: "POST",
      data: data,
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //   },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "somethig went wrong");
  }
};

export const useAddContactMessage = () => {
  return useMutation({
    mutationFn: (data: IContact) => addContactMessage(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
