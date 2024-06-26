import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../blog/useGetBlog";

const getStatus = async () => {
  try {
    const responce = await axios.get(baseUrl + "/resturant-status", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return responce?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetRestaurantStatus = (select?: any) => {
  return useQuery({
    queryKey: ["get_restaurent_status"],
    queryFn: getStatus,
    select,
  });
};
