import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getDishType = async (id: string) => {
  try {
    const res = await axios.get(baseUrl + `/dish-type/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    return res.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "somethig went wrong");
  }
};

export const useGetDishType = (id: string) => {
  return useQuery({
    queryKey: ["get_dish_type"],
    queryFn: () => getDishType(id),
    enabled: !!id,
  });
};
