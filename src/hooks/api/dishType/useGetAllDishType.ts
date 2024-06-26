import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "./useGetDishType";

const getAllDishType = async () => {
  try {
    const response = await axios.get(baseUrl + "/dish-type", {
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

export const useGetAllDishType = (select?: any) => {
  return useQuery({
    queryKey: ["all_dish_type"],
    queryFn: getAllDishType,
    select,
  });
};

export const useFilterAllDishType = () => {
  return useGetAllDishType((data: any) => {
    const filterData = data?.map((el: any) => ({
      label: el.name,
      value: el.id,
    }));
    return filterData;
  });
};
