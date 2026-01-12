import SmartCalendar from "../components/shared/calendar";
import { HiClock, HiMiniMapPin, HiTicket } from "react-icons/hi2";
import useGetUserData from "../hooks/useGetUserData";
import LoadingAnimation from "../components/loadingAnimation";
import { dateFormat } from "../utils/dateFormat";
import { textLimit } from "../utils/textlimit";
import { formatNumber } from "../utils/numberFormat";
import { useEffect, useState } from "react";
import type { IEvent, IEventTicket } from "../model/event";
import ModalLayout from "../components/shared/modalLayout";
import { format } from "date-fns";


export default function UserId() {


    const { data, isLoading } = useGetUserData().getUserData()
    const [show, setShow] = useState(false)
    const { data: dateEvent, isLoading: loading, month, setMonth, setInternalId, showModal, setShowModal } = useGetUserData().getEventDataByDate()

    useEffect(() => {
        setInternalId(data?._id)
    }, [data?.userId])

    const clickDate = (date: Date) => {
        setShowModal(true)
        setMonth(new Date(date))
    }


    const paragraphs = data?.bio
        ?.split(/\n\s*\n/)
        .filter(Boolean);

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-full flex flex-col h-full pb-6 items-center overflow-y-auto " >
                <div className=" max-w-[500px] w-full flex flex-col gap-4 shadow rounded-b-4xl bg-[#37137F] h-auto" >
                    <div className=" w-full h-fit flex justify-center " >
                        <div className=" w-[80%] h-[100px] flex flex-col gap-2 items-center justify-end " >
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
                            <p className=" text-sm font-medium " >{textLimit(data?.bio, 150)} {data?.bio?.length > 150 && <span onClick={() => setShow(true)} className=" font-bold cursor-pointer underline " >Show More</span>}</p>
                        </div>
                        <div className=" w-full flex flex-col items-center gap-2 " >
                            <div className=" p-3 font-extrabold text-sm rounded-lg text-white bg-[#B00062] shadow " >
                                Upcoming Events
                            </div>
                            <SmartCalendar
                                label="Select Month & Year"
                                value={month}
                                onSelect={clickDate}
                                minYear={2024}
                                maxYear={2040}
                            />


                        </div>

                        <div className=" w-full flex h-auto flex-col items-center" >
                        </div>


                        <ModalLayout width=" lg:max-w-[500px] max-w-full w-full " rounded="24px" open={show} setOpen={setShow} >
                            <div className=" w-full h-[80vh] overflow-y-auto px-3 pb-4 flex flex-col gap-3 " >
                                <div className=" px-[14px] py-[8px] font-extrabold w-fit mx-auto text-sm rounded-3xl bg-[#37137F] text-white shadow " >
                                    About Us
                                </div>
                                <p className=" text-sm font-medium text-primary " >
                                    {paragraphs}
                                </p>
                            </div>
                        </ModalLayout>

                        <ModalLayout width=" lg:max-w-[500px] max-w-full w-full " rounded="24px" open={showModal} setOpen={setShowModal} >
                            {/* <DonateForm setOpen={setOpen} /> */}
                            <div className=" w-full h-[80vh] flex gap-4 flex-col " >
                                <div className=" p-3 w-fit mx-auto font-extrabold text-sm rounded-lg text-white bg-[#B00062] shadow " >
                                    Event Schedules
                                </div>
                                {month && (
                                    <div className="text-sm mx-auto text-gray-600">
                                        Selected:{" "}
                                        <span className="font-medium text-gray-800">
                                            {format(month, "MMMM yyyy")}
                                        </span>
                                    </div>
                                )}
                                <LoadingAnimation loading={loading} text="No Events Found" length={Object.keys(dateEvent ?? {}).length} >
                                    <div className="  w-full flex overflow-auto max-h-[68vh] flex-col gap-3 " >
                                        {Object.entries(dateEvent).map(([date, events]) => (
                                            <div key={date}>
                                                {new Date(date) > new Date() &&
                                                    <>
                                                        {(Array.isArray(events) ? events : []).map((item: IEvent) => {
                                                            const minPrice =
                                                                Array.isArray(item?.ticketing) && item.ticketing.length > 0
                                                                    ? Math.min(...item.ticketing.map((ticket: IEventTicket) => ticket.ticketPrice))
                                                                    : 0;

                                                            return (
                                                                <a key={item?._id} href={`/event/${item?._id}?back=true`} className=" w-full bg-[#37137F] text-white items-start p-4 rounded-xl flex flex-col gap-1 " >
                                                                    <p className=" text-xs font-bold " >{textLimit(item?.name, 30)}</p>
                                                                    <div className=" flex items-center gap-2 " >
                                                                        <HiMiniMapPin />
                                                                        <p className=" text-xs font-medium " >{item?.meetingLink ? "Online" : textLimit(item?.address, 40)}</p>
                                                                    </div>
                                                                    <div className=" flex items-center gap-2 " >
                                                                        <HiClock />
                                                                        <p className=" text-xs font-medium " >{dateFormat(item?.endTime)}</p>
                                                                    </div>
                                                                    <div className=" flex items-center gap-2 " >
                                                                        <HiTicket />
                                                                        {item?.ticketing?.length > 1 && (
                                                                            <p className=" text-xs font-medium " >From</p>
                                                                        )}
                                                                        <p className=" text-xs font-medium " >{minPrice === 0 ? "Free" : formatNumber(minPrice / 100, item?.currency as any)}</p>
                                                                    </div>
                                                                </a>
                                                            )
                                                        })}
                                                    </>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </LoadingAnimation>
                            </div>
                        </ModalLayout>
                    </div>
                </div>
            </div>
        </LoadingAnimation>
    )
}