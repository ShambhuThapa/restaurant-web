import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getAllDish = async (dishType?: string) => {
  const url = dishType ? `/dish?dishType=${dishType}` : "/dish";
  try {
    const response = await axios.get(baseUrl + url, {
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

export const useGetAllDish = (dishType?: string) => {
  return useQuery({
    queryKey: ["all_dish"],
    queryFn: () => getAllDish(dishType),
  });
};
