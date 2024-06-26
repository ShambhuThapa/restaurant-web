import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getWebSiteInfo = async () => {
  try {
    const response = await axios.get(baseUrl + `/information`, {
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
export const useGetWebSiteInfo = (select?: any) => {
  return useQuery({
    queryKey: ["all_website_info"],
    queryFn: getWebSiteInfo,
    select,
  });
};

export const useFilterWebSiteInfo = () => {
  return useGetWebSiteInfo((data: any) => {
    const filterData = {
      ...data,
      ...data?.social,
      ...data,
      houseNumber: data.houseNumber.toString(),
      postalCode: data.postalCode.toString(),
    };

    return filterData;
  });
};
