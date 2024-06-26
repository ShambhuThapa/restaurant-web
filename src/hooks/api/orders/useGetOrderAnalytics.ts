import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getOrderAnalytics = async () => {
  try {
    const response = await axios.get(baseUrl + "/orders/analytics", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetOrderAnalytics = () => {
  return useQuery({
    queryKey: ["all_Order_analytics"],
    queryFn: getOrderAnalytics,
  });
};
