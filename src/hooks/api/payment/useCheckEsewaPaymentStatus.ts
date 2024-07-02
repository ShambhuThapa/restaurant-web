import axios from "axios";

import { baseUrl } from "../blog/useGetBlog";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const checkPaymentStatus = async (hashCode: string) => {
  try {
    const response = await axios({
      url:baseUrl + "/payment/verify",
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      data: {
        "encodedData":hashCode
      },
    });
    return response.data;
  } catch (error: any) {
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject(error);
    }
  }
};

export const useCheckEsewaPaymentStatus = () => {
    return useMutation({
      mutationFn: (hashCode: string) => checkPaymentStatus(hashCode),
      onSuccess: (data) => {
        if(data?.status==="COMPLETE"){
         toast.success("Successful Payment");
        }
      },
      onError: (error) => {
        toast.error(`${error.message || "Some error occured"}`);
      },
  });
}
