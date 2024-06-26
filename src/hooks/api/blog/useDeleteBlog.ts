import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "./useGetBlog";

const deleteBlog = async (id: string) => {
  try {
    const response = await axios({
      url: baseUrl + `/blog/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess(data) {
      toast.success(`${data.message}`);
    },
    onError: (error:any) => {
      toast.error("some error occured");
    },
  });
};
