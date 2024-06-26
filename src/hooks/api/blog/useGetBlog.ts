import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getBlog = async (id: string) => {
  try {
    const res = await axios.get(baseUrl + `/blog/${id}`, {
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

export const useGetBlogs = (id: string) => {
  return useQuery({
    queryKey: ["get_Blog",id],
    queryFn: () => getBlog(id),
    enabled: !!id,
  });
};
