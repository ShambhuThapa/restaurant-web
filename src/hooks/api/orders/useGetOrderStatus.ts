import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getOrderStatus = async (id: string) => {
  try {
    const response = await axios.get(baseUrl + `/stripe/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetOrderStatus = (id: string, select?: any) => {
  return useQuery({
    queryKey: ["get_order_status", id],
    queryFn: () => getOrderStatus(id),
    enabled: !!id,
    select,
  });
};
