import { useQuery } from '@tanstack/react-query';

import axios from "axios";


export const  baseUrl=process.env.NEXT_PUBLIC_API_URL;
const getAllCoupan=async()=>{
    try{
        const responce= await  axios.get(baseUrl+"/coupon",{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "ngrok-skip-browser-warning": true,
            },
           
        });
        return responce?.data;
    }catch(error:any){

    return Promise.reject(error?.response?.data || "Something went wrong");
    }
}

export const useGetAllCoupon=(select?:any)=>{
    return useQuery({
        queryKey:["all_coupan"],
        queryFn:getAllCoupan,
        select,
    })
}