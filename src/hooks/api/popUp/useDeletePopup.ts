import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { baseUrl } from "../dishType/useGetDishType";

const deletePopUp = async (id: string) => {
  try {
    const respose = await axios({
      url: baseUrl + `/advertisement-popup/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return respose?.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Someting went wrong");
  }
};
export const useDeletePopup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePopUp(id),
    onSuccess: (data) => {
      toast.success(`${data.message}`);
      queryClient.invalidateQueries({ queryKey: ["all_pop_up"] });
    },
    onError: (error) => {
      toast.error(`Some error occured !!`);
    },
  });
};
