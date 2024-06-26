import exp from "constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const deleteDish = async (id: string) => {
  try {
    const response = await axios({
      url: baseUrl + `/dish/${id}`,
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

export const useDeleteDish = () => {
  return useMutation({
    mutationFn: (id: string) => deleteDish(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: () => {
      toast.error(`Some error occured !!`);
    },
  });
};
