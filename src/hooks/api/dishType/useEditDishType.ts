import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TDishType } from "@/lib/validation/dishTypeSchema";

import { baseUrl } from "./useGetDishType";

const editDishType = async (data: TDishType) => {
  try {
    const respose = await axios({
      url: baseUrl + `/dish-type/${data.id}`,
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

export const useEditDishType = () => {
  return useMutation({
    mutationFn: (data: TDishType) => editDishType(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("Some error occured");
    },
  });
};
