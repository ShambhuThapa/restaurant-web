import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


import { baseUrl } from "../dishType/useGetDishType";

const orderStatus = async (data: any) => {
  try {
    const respose = await axios({
      url: baseUrl + `/orders/status/${data?.id}`,
      method: "PATCH",
      data:data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return respose?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => orderStatus(data),
    onSuccess: (data) => {
      toast.success(`Order status changed successfully.`);
      queryClient.invalidateQueries({ queryKey: ["all_Order"] });
    },
    onError: (error) => {
      toast.error("Some error occured");
    },
  });
};
