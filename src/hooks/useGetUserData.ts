import { useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import httpService from "../utils/httpService";
import { useParams } from "react-router-dom";
import type { IParnter } from "../model/user"; 
import { format } from "date-fns";


interface EventData {
    [date: string]: any; // date => list of events
}

interface Props {
    data: EventData;
}

const userId = sessionStorage.getItem("userId")

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

        const { isLoading, isRefetching } = useQuery(
            ["userdetail", userId],
            () => httpService.get(`/users/${userId}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                    // localStorage.setItem("access_token", "")
                    // navigate(0)
                },
                onSuccess: (data: any) => {
                    if (data?.data?.user) {
                        setData(data?.data?.user)
                    }
                },
                enabled: userId ? true : false
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


        const [internalId, setInternalId] = useState<string>("");
        const [month, setMonth] = useState<Date | undefined>(undefined);
        const [data, setData] = useState<any>({} as any);

        const [showModal, setShowModal] = useState<boolean>(false);

        const { isLoading, isRefetching } = useQuery(
            ["Event-date", internalId, month?.toISOString()],
            () => httpService.get(`/event-partners/event-schedule/${internalId}/${format(month ?? new Date(), "yyyy-MM")}`),
            {
                onError: (error: any) => {
                    toast.error(error.response?.data)
                },
                onSuccess: (data: any) => {
                    setData(data?.data?.events)
                    console.log(data?.data?.events);
                },
            },
        );

        return {
            data,
            isLoading,
            month,
            setInternalId,
            setMonth,
            isRefetching,
            showModal,
            setShowModal,
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