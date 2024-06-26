import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getReview = async (status?: string) => {
  const path = status != "all" ? `/review?status=${status}` : `/review`;
  try {
    const res = await axios.get(baseUrl + path, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetAllReview = (status?: string) => {
  return useQuery({
    queryKey: ["all_review", status],
    queryFn: () => getReview(status),
  });
};
