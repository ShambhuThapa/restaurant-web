import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TDish } from "@/lib/validation/dishSchema";

import { baseUrl } from "../dishType/useGetDishType";

const editDish = async (data: TDish) => {
  try {
    const respose = await axios({
      url: baseUrl + `/dish/${data.id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    return respose?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useEditDish = () => {
  return useMutation({
    mutationFn: (data: TDish | any) => editDish(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("Some error occured");
    },
  });
};
