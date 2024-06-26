import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "./useGetDishType";

const deleteDishType = async (id: string) => {
  try {
    const response = await axios({
      url: baseUrl + `/dish-type/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useDeleteDishType = () => {
  return useMutation({
    mutationFn: (id: string) => deleteDishType(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
