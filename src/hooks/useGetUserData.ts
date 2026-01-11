import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";   
import type { IEvent } from "../model/event";
import httpService from "../utils/httpService"; 
import { useNavigate, useParams } from "react-router-dom";
import type { IParnter } from "../model/user";
import Cookies from "js-cookie";
import { format } from "date-fns";


interface EventData {
    [date: string]: any; // date => list of events
  }
  
  interface Props {
    data: EventData;
  }

  const userId = Cookies.get("userId")
  

const useGetUserData = () => {

    const { id } = useParams(); 
    const navigate = useNavigate();

    // Get Event list
    const getUserData = () => {
        const [data, setData] = useState<IParnter>({} as IParnter)
        const { isLoading, isRefetching } = useQuery(
            ["userdata", id],
            () => httpService.get(`/event-partners/${id}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {   
                    setData(data?.data?.eventPartner)
                    
                }, 
            },
        );

        return {
            data,
            isLoading,
            isRefetching
        }
    }

    const getCurrencyData = () => {
        const [data, setData] = useState<any>({} as any)
        const { isLoading, isRefetching } = useQuery(
            ["currencydata", id],
            () => httpService.get(`/donations/currency-quote`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {    
                    setData(data?.data?.quotes) 
                }, 
            },
        );

        return {
            data,
            isLoading,
            isRefetching
        }
    }


    // Get Event list
    const getCurrentUserData = () => {
        const [data, setData] = useState<IParnter>({} as IParnter)
        // const userId = Cookies.get("userId");
        const token = localStorage.getItem("access_token")
        
        const { isLoading, isRefetching } = useQuery(
            ["userdetail", id],
            () => httpService.get(`/users/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data) 
                    localStorage.setItem("access_token", "")
                    navigate(0)
                },
                onSuccess: (data: any) => {    
                    setData(data?.data?.user) 
                }, 
                enabled: token ? true : false
            },
        );

        return {
            data,
            isLoading,
            isRefetching
        }
    }

    // /api
    // Get Event list
    const getEventData = () => {
        const [data, setData] = useState<Props>({} as Props)
        const { isLoading, isRefetching } = useQuery(
            ["Event-sch", id],
            () => httpService.get(`/event-partners/event-schedule/${id}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => { 
                    
                    setData(data?.data?.events)
                }, 
            },
        );

        return {
            data,
            isLoading,
            isRefetching
        }
    }



    // Get Event list
    const getEventDataByDate = () => {


        const [date, setDate] = useState<any>(""); 
        const [month, setMonth] = useState<Date | undefined>(new Date()); 

        console.log(month);

        const [data, setData] = useState<IEvent[]>([])
        const { isLoading, isRefetching } = useQuery(
            ["Event-date", id, date],
            () => httpService.get(`/organizations/event-schedule/${id}/${format(month ?? new Date(), "yyyy-MM")}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {  
                    setData([])
                    console.log(data);
                },
                // enabled: date ? true : false
            },
        );

        return {
            data,
            isLoading,
            date,
            month,
            setMonth,
            setDate,
            isRefetching
        }
    }

    return {
        getUserData, 
        getEventDataByDate,
        getEventData,
        getCurrentUserData,
        getCurrencyData
    };
}

export default useGetUserData