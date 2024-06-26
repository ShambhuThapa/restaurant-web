import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { TLogin } from "@/lib/validation/logInSchema";

import { baseUrl } from "./useGetDishType";

const login = async (data: TLogin) => {
  try {
    const response = await axios({
      url: baseUrl + "/auth/login",
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Access-Control-Allow-Origin": "https://stagingapi.sushimerksem.be/v1",
      },
    });

    if (response?.data?.accessToken) {
      localStorage.setItem("token", response?.data?.accessToken);
      localStorage.setItem("role", response?.data?.role);
    }

    return response?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "somethig went wrong");
  }
};

export const useLogin = (select?: any) => {
  return useMutation({
    mutationFn: (data: TLogin) => login(data),
    onSuccess: (data) => {
      toast.success("Login successful.");
    },
    onError: (error) => {
      toast.error(`${error?.message}`);
    },
  });
};
