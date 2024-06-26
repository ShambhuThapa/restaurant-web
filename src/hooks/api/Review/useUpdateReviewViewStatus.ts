import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const updateReviewViewStatus = async (id:string) => {
  try {
    const response = await axios({
      url: baseUrl + `/review/read/${id}`,
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

export const useUpdateReviewViewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id:string) => updateReviewViewStatus(id),
    onSuccess: (data) => {
      toast.success(`Marked as read.`);
      queryClient.invalidateQueries({ queryKey: ["all_review"] });
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
