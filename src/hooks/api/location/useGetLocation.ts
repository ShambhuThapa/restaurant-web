import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getLocation = async (id: string) => {
  try {
    const response = await axios.get(
      baseUrl + `/delivery-location-preference/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "ngrok-skip-browser-warning": true,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "somethig went wrong");
  }
};

export const useGetLocation = (id: string, select?: any) => {
  return useQuery({
    queryKey: ["get_location", id],
    queryFn: () => getLocation(id),
    enabled: !!id,
    select,
  });
};
