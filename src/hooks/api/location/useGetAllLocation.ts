import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getAllLocation = async () => {
  try {
    const response = await axios.get(
      baseUrl + "/delivery-location-preference",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Someting went wrong");
  }
};

export const useGetAllLocation = (select?: any) => {
  return useQuery({
    queryKey: ["all_location"],
    queryFn: getAllLocation,
    select,
  });
};

export const useGetFilterLocation = () => {
  return useGetAllLocation((data: any) => {
    return data?.map((el: any) => ({
      label: `${el?.locationName}(${el?.postalCode})`,
      value: el?.id,
    }));
  });
};
