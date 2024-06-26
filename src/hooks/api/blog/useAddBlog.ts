import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TBlogFormType } from "@/lib/validation/blogFormSchema";

import { baseUrl } from "./useGetBlog";

const addBlog = async (data: TBlogFormType) => {
  try {
    const response = await axios({
      url: baseUrl + "/blog",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useAddBlog = () => {
  return useMutation({
    mutationFn: (data: TBlogFormType) => addBlog(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
