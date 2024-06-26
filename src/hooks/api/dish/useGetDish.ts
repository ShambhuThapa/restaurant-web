import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { baseUrl } from "../dishType/useGetDishType";

const getDish = async (id: string) => {
  try {
    const response = await axios.get(baseUrl + `/dish/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
      },
    });
    return response.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetDish = (id: string, select?: any) => {
  return useQuery({
    queryKey: ["get_dish", id],
    queryFn: () => getDish(id),
    enabled: !!id,
    select,
  });
};

export const useFilterDish = (id: string) => {
  return useGetDish(id, (data: any) => {
    const supplement = data?.supplement?.map((el: string) => ({
      value: el,
    }));
    const filterDish = {
      ...data,
      supplement: supplement,
      price: String(data.price),
      takeAwayDiscount: String(data.takeAwayDiscount),
      deliveryDiscount: String(data.deliveryDiscount),
      vat: String(data.vat),
    };

    return filterDish;
  });
};
