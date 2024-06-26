import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getAllOrder = async (params:string) => {
  try {
    const response = await axios.get(baseUrl + `/orders?${params}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetAllOrder = (queryStringFilters:string) => {
  return useQuery({
    queryKey: ["all_Order",queryStringFilters],
    queryFn:()=> getAllOrder(queryStringFilters),
    refetchInterval: 2000,
  });
};
