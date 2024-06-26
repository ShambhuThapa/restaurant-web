import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getOrder = async (id: string) => {
  try {
    const response = await axios.get(baseUrl + `/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetOrder = (id: string, select?: any) => {
  return useQuery({
    queryKey: ["get_order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
    select,
  });
};
