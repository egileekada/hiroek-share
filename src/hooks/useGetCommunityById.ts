
import { useQuery } from "react-query";
import toast from "react-hot-toast"; 
import { useState } from "react";  
import { useParams } from "react-router-dom"; 
import httpService from "../utils/httpService";
import type { ICommunity } from "../model/community";

const useGetCommunityById = (index?: string) => {

    const [data, setData] = useState({} as ICommunity)
    const { id } = useParams();
 
    // react query
    const { isLoading, isRefetching } = useQuery(
        ["communities-by-id", index ?? id],
        () => httpService.get(`/communities/${index ?? id}`),
        {
            onError: (error: any) => {
                toast.error(error.response?.data)
                // console.log(error);
            },
            onSuccess: (data: any) => { 
                setData(data?.data?.community) 
            },
            enabled: (id || index) ? true : false
        },
    );

    return {
        isLoading,
        isRefetching,
        data
    };
}

export default useGetCommunityById