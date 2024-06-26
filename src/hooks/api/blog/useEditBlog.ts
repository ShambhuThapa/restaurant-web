"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TBlogFormType } from "@/lib/validation/blogFormSchema";

import { baseUrl } from "./useGetBlog";

const editBlog = async (data: TBlogFormType) => {
  try {
    const responce = await axios({
      url: baseUrl + `/blog/${data.id}`,
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    return responce?.data;
  } catch (error: any) {
    return Promise.reject(error?.responce?.data || "something is wrong");
  }
};

export const useEditBlog = () => {
  return useMutation({
    mutationFn: (data: TBlogFormType) => editBlog(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error("some error occured");
    },
  });
};
