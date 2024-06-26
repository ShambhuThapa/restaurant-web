import axios from "axios";

import { baseUrl } from "../blog/useGetBlog";

interface IData {
  amount: number;
  paymentMethod: string;
}

export const fetchPaymentIntent = async (data: IData) => {
  try {
    const response = await axios({
      url: baseUrl + `/stripe`,
      method: "POST",
      data: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": true,
        "Access-Control-Allow-Origin":'*'
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
