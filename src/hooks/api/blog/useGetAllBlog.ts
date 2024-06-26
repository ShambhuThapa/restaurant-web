import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "./useGetBlog";

const getAllBlog = async () => {
  try {
    const responce = await axios.get(baseUrl + "/blog", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return responce?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetAllBlog = (select?: any) => {
  return useQuery({
    queryKey: ["all_blog"],
    queryFn: getAllBlog,
    select,
  });
};
