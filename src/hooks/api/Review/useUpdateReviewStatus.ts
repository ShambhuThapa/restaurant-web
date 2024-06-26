import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const updateReviewStatus = async (data: any) => {
  try {
    const response = await axios({
      url: baseUrl + `/review/${data?.id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => updateReviewStatus(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["all_review"] });
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
