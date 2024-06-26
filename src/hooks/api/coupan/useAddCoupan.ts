import { toast } from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import { Tcoupan } from '@/lib/validation/coupanSchema';

import  axios  from 'axios';
import { baseUrl } from './useGetAllCoupan';



 export const addCoupan=async(data:any)=>{
    try{
        const responce=await axios({
            url:baseUrl+"/coupon",
            method:"POST",
            data:data,
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
            
        });
        return responce?.data;
    }catch(error:any){
        return Promise.reject(error?.response?.data || "Something went wrong");
    }
}

export const useAddCoupan =()=>{
    return useMutation({
        mutationFn:(data:any)=>addCoupan(data),
        onSuccess:(data)=>{
            toast.success(`${data?.message}`)
        },
        onError:(error)=>{
            toast.error("some error  occured")
        },
    });
    
};