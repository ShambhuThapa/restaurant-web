import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


import { baseUrl } from "../dishType/useGetDishType";

const markRead = async (id: string) => {
  try {
    const respose = await axios({
      url: baseUrl + `/orders/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return respose?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useMarkRead= () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markRead(id),
    onSuccess: (data) => {
      toast.success(`Marked as read.`);
      queryClient.invalidateQueries({ queryKey: ["all_Order"] });
    },
    onError: (error) => {
      toast.error("Some error occured");
    },
  });
};
