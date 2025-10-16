import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";   
import type { IEvent } from "../model/event";
import httpService from "../utils/httpService";
import { useEventDetail } from "../global/useEventDetails";
import { useParams } from "react-router-dom";

const useGetEventData = () => {
 
    const { updateEvent } = useEventDetail((state) => state)  
    const { id } = useParams(); 

    // Get Event list
    const getEventData = () => {
        const [data, setData] = useState<IEvent>({} as IEvent)
        const { isLoading, isRefetching } = useQuery(
            ["Event", id],
            () => httpService.get(`/events/${id}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.event)
                    updateEvent(data?.data?.event)  
                },
                // enabled: history?.pathname?.includes("dashboard/event") || history?.pathname === "/dashboard"
            },
        );

        return {
            data,
            isLoading,
            isRefetching
        }
    }

    return {
        getEventData, 
    };
}

export default useGetEventData