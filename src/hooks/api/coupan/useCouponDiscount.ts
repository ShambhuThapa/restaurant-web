import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const getCoupan = async (code: string) => {
  try {
    const responce = await axios.get(baseUrl + `/coupon/${code}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    return responce?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetCouponDiscount = (code: string, select?: any) => {
  return useQuery({
    queryKey: ["coupan_discount"],
    queryFn: () => getCoupan(code),
    enabled: !!code,
    select,
  });
};
