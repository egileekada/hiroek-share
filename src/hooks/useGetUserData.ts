import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";   
import type { IEvent } from "../model/event";
import httpService from "../utils/httpService"; 
import { useParams } from "react-router-dom";
import type { IParnter } from "../model/user";


interface EventData {
    [date: string]: any; // date => list of events
  }
  
  interface Props {
    data: EventData;
  }
  

const useGetUserData = () => {
  
    const { id } = useParams(); 

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
        
        const [data, setData] = useState<IEvent[]>([])
        const { isLoading, isRefetching } = useQuery(
            ["Event-date", id, date],
            () => httpService.get(`/event-partners/event-daily-schedule/${id}/${new Date(date ?? "").toISOString()}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {  
                    setData(data?.data?.events)
                },
                enabled: date ? true : false
            },
        );

        return {
            data,
            isLoading,
            date,
            setDate,
            isRefetching
        }
    }

    return {
        getUserData, 
        getEventDataByDate,
        getEventData
    };
}

export default useGetUserData