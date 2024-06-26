import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getTotalOrder = async () => {
  try {
    const response = await axios.get(baseUrl + "/orders/total-orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetTotalOrder = () => {
  return useQuery({
    queryKey: ["total_Order"],
    queryFn: getTotalOrder,
    refetchInterval: 2000,
  });
};
