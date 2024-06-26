import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const updateMessageStatus = async (id: string) => {
  try {
    const response = await axios({
      url: baseUrl + `/contact-message/read/${id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useUpdateMessageStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => updateMessageStatus(id),
    onSuccess: (data) => {
      toast.success(`Marked as read.`);
      queryClient.invalidateQueries({ queryKey: ["all_contact_message"] });
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
