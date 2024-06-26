import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getAllPopUp = async () => {
  try {
    const response = await axios.get(baseUrl + "/advertisement-popup", {
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
export const useGetAllPopUp = () => {
  return useQuery({
    queryKey: ["all_pop_up"],
    queryFn: getAllPopUp,
  });
};
