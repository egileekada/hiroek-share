import SmartCalendar from "../components/shared/calendar";
import { HiClock, HiMiniMapPin } from "react-icons/hi2";
import useGetUserData from "../hooks/useGetUserData";
import LoadingAnimation from "../components/loadingAnimation";
import { dateFormat } from "../utils/dateFormat";
import { textLimit } from "../utils/textlimit"; 


export default function UserId() {


    const { data, isLoading } = useGetUserData().getUserData()

    const { data: event } = useGetUserData().getEventData()

    const { date, setDate, data: dateEvent, isLoading: loading } = useGetUserData().getEventDataByDate()

    const sortedDates = Object.keys(event).sort(); 

    console.log(dateEvent);

    console.log(event);
    

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-full flex flex-col h-full pb-6 items-center overflow-y-auto " >
                <div className=" max-w-[500px] w-full flex flex-col gap-4 shadow rounded-b-4xl bg-[#37137F] h-auto" >
                    <div className=" w-full h-fit flex justify-center " >
                        <div className=" w-[80%] h-[150px] flex flex-col gap-2 items-center justify-end " >
                            <img src={data?.logo} alt="logo" className=" w-24 h-24 rounded-2xl object-cover " />
                            {/* <p className= " font-black text-3xl text-white text-center " >{data?.name}</p> */}
                        </div>
                    </div>
                    <div className=" w-full flex flex-col h-full py-5 gap-3 px-4 rounded-4xl text-center text-[#37137F] items-center bg-white " >
                        <div className=" w-full flex flex-col items-center " >
                            <p className=" text-2xl font-extrabold " >{data?.name}</p> 
                        </div>

                        <div className=" px-[14px] w-full flex flex-col items-center gap-1 py-[10px] font-extrabold text-xs rounded-3xl bg-[#37137F1A] shadow " >
                            <div className=" px-[14px] py-[8px] font-extrabold text-sm rounded-3xl bg-[#37137F] text-white shadow " >
                                About Us
                            </div>
                            <p className=" text-sm font-semibold " >{data?.bio}</p>
                        </div>
                        <div className=" w-full flex flex-col items-center gap-2 " >
                            <div className=" p-3 font-extrabold text-sm rounded-lg text-white bg-[#B00062] shadow " >
                                Upcoming Events
                            </div>
                            <SmartCalendar
                                label="Select a date"
                                value={date}
                                onSelect={setDate}
                                minDate={new Date()}
                            />
                        </div>

                        <div className=" w-full flex h-auto flex-col items-center" >
                            <div className=" p-3 font-extrabold text-sm rounded-lg text-white bg-[#B00062] shadow " >
                                Event Schedules
                            </div>
                            {!date && (
                                <div className=" w-full flex flex-col gap-3 mt-6 " >
                                    {sortedDates.map((date) => (
                                        <div className=" w-full " key={date}>
                                            <div className=" flex w-full flex-col gap-3 " >
                                                {/* @ts-ignore fixed this */}
                                                {event[date].map((item, index) => {

                                                    return (
                                                        <a key={index} href={`https://events.hiroek.io/event/${item?._id}?back=true`} className=" bg-[#37137F] text-white items-start p-4 rounded-xl flex flex-col gap-1 " >
                                                            <p className=" text-xs font-bold " >{textLimit(item?.name, 30)}</p>
                                                            <div className=" flex items-center gap-2 " >
                                                                <HiMiniMapPin />
                                                                <p className=" text-xs font-medium " >{textLimit(item?.address, 40)}</p>
                                                            </div>
                                                            <div className=" flex items-center gap-2 " >
                                                                <HiClock />
                                                                <p className=" text-xs font-medium " >{dateFormat(item?.endTime)}</p>
                                                            </div>
                                                        </a>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(date) && (
                                <LoadingAnimation loading={loading} length={dateEvent?.length} >
                                    <div className="  w-full flex flex-col gap-3 mt-6 " >
                                        {dateEvent.map((item) => {
                                            return (
                                                <a href={`https://events.hiroek.io/event/${item?._id}?back=true`} className=" w-full bg-[#37137F] text-white items-start p-4 rounded-xl flex flex-col gap-1 " >
                                                    <p className=" text-xs font-bold " >{textLimit(item?.name, 30)}</p>
                                                    <div className=" flex items-center gap-2 " >
                                                        <HiMiniMapPin />
                                                        <p className=" text-xs font-medium " >{textLimit(item?.address, 40)}</p>
                                                    </div>
                                                    <div className=" flex items-center gap-2 " >
                                                        <HiClock />
                                                        <p className=" text-xs font-medium " >{dateFormat(item?.endTime)}</p>
                                                    </div>
                                                </a>
                                            )
                                        })}
                                    </div>
                                </LoadingAnimation>
                            )}
                        </div>
                    </div>
                </div> 
            </div>
        </LoadingAnimation>
    )
}