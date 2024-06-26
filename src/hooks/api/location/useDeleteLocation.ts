import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const deleteLocation = async (id: string) => {
  try {
    const response = await axios({
      url: baseUrl + `/delivery-location-preference/${id}`,
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

export const useDeleteLocation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteLocation(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
