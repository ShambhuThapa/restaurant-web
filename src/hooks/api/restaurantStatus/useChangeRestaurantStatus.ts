import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

interface IStatus {
  id: string;
  isClosed: boolean;
}

const changeStatus = async (data: IStatus) => {
  try {
    const response = await axios({
      url: baseUrl + "/resturant-status/" + data.id,
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

export const useChangeRestaurantStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IStatus) => changeStatus(data),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["get_restaurent_status"] });
    },
    onError: (error) => {
      toast.error(`Some error occured`);
    },
  });
};
