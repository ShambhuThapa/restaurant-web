import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getContactMessage = async () => {
  try {
    const res = await axios.get(baseUrl + "/contact-message", {
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

export const useGetAllContactMessage = () => {
  return useQuery({
    queryKey: ["all_contact_message"],
    queryFn: getContactMessage,
  });
};
