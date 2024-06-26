import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TwebSiteInfo } from "@/lib/validation/webSiteinfoSchema";

import { baseUrl } from "../dishType/useGetDishType";

const editWebSiteInfo = async (data: any) => {
  try {
    const response = await axios({
      url: baseUrl + `/information/${data.id}`,
      method: "PATCH",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useEditWebSiteInfo = () => {
  return useMutation({
    mutationFn: (data: any) => editWebSiteInfo(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
