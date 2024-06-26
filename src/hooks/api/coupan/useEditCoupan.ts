import { Tcoupan } from '@/lib/validation/coupanSchema';
import { useMutation } from '@tanstack/react-query';
import { baseUrl } from './../contactMessage/useGetAllMessages';
import axios from "axios"
import toast from 'react-hot-toast';


const editCoupon=async(data:any)=>{
    try{
        const responce=await axios({
            url:baseUrl+`/coupon/${data.id}`,
            method:"PATCH",
            data:data,
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,
                "ngrok-skip-browser-warning": true,
            },
            
        });
        return responce?.data;
    }catch(error:any){
        return Promise.reject(error?.response?.data || "Something went wrong");
    }
}


export const useEditCoupon=()=>{
    return useMutation({
        mutationFn:(data:any)=>editCoupon(data),
        onSuccess:(data)=>{
            toast.success(`${data.message}`)
        },
        onError:(error) => {
            toast.error("Somethins is worng");
            
        },
        
    });
}