import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getDishType = async (id: string) => {
  try {
    const response = await axios.get(baseUrl + `/dish/type/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetDishByDishType = (id: string, select?: any) => {
  return useQuery({
    queryKey: ["get_dish_by_dish_type", id],
    queryFn: () => getDishType(id),
    enabled: !!id,
    select,
  });
};
