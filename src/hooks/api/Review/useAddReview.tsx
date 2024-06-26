import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TReview } from "@/lib/validation/reviewschama";

import { baseUrl } from "../dishType/useGetDishType";

const addReview = async (data: TReview) => {
  try {
    const response = await axios({
      url: baseUrl + "/review",
      method: "POST",
      data: data,
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "somethig went wrong");
  }
};

export const useAddReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TReview) => addReview(data),
    onSuccess: (data) => {
      toast.success(`Review sent successfully.`);
      queryClient.invalidateQueries({ queryKey: ["all_review"] });
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
