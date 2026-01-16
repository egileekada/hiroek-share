import { useState } from "react"
import ChartGraph from "../components/chartGraph"
// import CountdownTimer from "../components/countDownTimer"
import LoadingAnimation from "../components/loadingAnimation"
import useGetEventData from "../hooks/useGetEventData"
import { LocationIcon, CalendarIcon2, ClockIcon, TicketIcon, BackArrowIcon } from "../svg"
import { dateFormat, timeFormat } from "../utils/dateFormat"
import { formatNumberWithKCurrency } from "../utils/formatNumberWithK"
import { formatNumber } from "../utils/numberFormat"
import { textLimit } from "../utils/textlimit"
import CustomButton from "../components/shared/customButton"
import ModalLayout from "../components/shared/modalLayout"
import DonateForm from "../components/donateForm"
import CountdownTimer from "../components/countDownTimer"
import { Text } from "@radix-ui/themes"
import EventTicketForm from "../components/eventTicketForm"
// import type { IEventTicket } from "../model/event"
import { IoMdEye } from "react-icons/io"
import { capitalizeFLetter } from "../utils/capitalLetter"
import useGetUserData from "../hooks/useGetUserData"
import { useQuerys } from "../utils/useQuery"
import { useNavigate } from "react-router-dom"
import ViewMap from "../components/shared/viewMap"
import { HiTicket } from "react-icons/hi2"
import type { IEventTicket } from "../model/event"


function SharePage() {

    const { isLoading, data: event } = useGetEventData()?.getEventData()
    // const { data: user } = useGetUserData().getCurrentUserData()
    const { data: currencyData } = useGetUserData().getCurrencyData()


    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [showImg, setShowImg] = useState(false)
    const [showPartner, setShowPartner] = useState(false)
    const [showType, setShowType] = useState<string | null>(null)
    const [showHost, setShowHost] = useState(false)
    const navigate = useNavigate()

    const totalTickets = event?.ticketing?.reduce((sum, ticket) => sum + ticket?.spotsLeft, 0);
    // const totalTickets = event?.ticketing?.reduce((sum, ticket) => sum + ticket?.spotsLeft, 0);

    const query = useQuerys();

    const back = query.get("back");

    const paragraphs = event?.description
        ?.split(/\n\s*\n/)
        .filter(Boolean);

    const handleShowType = (type: string) => {
        setShowType(type)
        setShowImg(true)
    }


    const minPrice =
        Array.isArray(event?.ticketing) && event.ticketing.length > 0
            ? Math.min(...event.ticketing.map((ticket: IEventTicket) => ticket.ticketPrice))
            : 0;

    return (
        <>
            <LoadingAnimation loading={isLoading} >
                <div className=" w-full h-screen relative flex lg:flex-row flex-col gap-6 text-primary " >
                    <div className=" w-full h-fit flex flex-col gap-4 lg:rounded-[44px] lg:p-8 " >
                        <div className=" w-full lg:h-[300px] h-[300px] relative " >
                            {back && (
                                <div className=" flex gap-2 absolute left-4 top-4 z-30  " >
                                    <div className=' w-fit relative z-20 ' >
                                        <div onClick={() => navigate(-1)} role='button' className=' w-11 h-11 lg:w-[45px] lg:h-[45px] flex justify-center bg-white bg-opacity-15 rounded-[6px] items-center cursor-pointer ' style={{ boxShadow: "0px 2px 4px 0px #0000000D" }} >
                                            <BackArrowIcon />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <img src={event?.photo} alt={event?.name} className=" w-full h-full lg:rounded-b-3xl lg:rounded-3xl object-cover " />
                            <div onClick={() => handleShowType("event")} className=" absolute z-10 inset-0 bg-[#0000004D] " />
                        </div>
                        <div className=" w-full -mt-[150px] z-20 px-3  " >
                            <div className=" w-full rounded-2xl flex flex-col gap-2 " >

                                <div className=" w-full flex gap-4" >
                                    <div role="button" className=" w-full flex items-center justify-center gap-2 px-2 bg-[#FFFFFF4D] bg-opacity-30 rounded-[10px] h-[50px] " >
                                        <div onClick={() => handleShowType("host")} className=" w-8 h-8 rounded-full " >
                                            <img className=" w-full h-full rounded-full object-cover " src={event?.admin?.photo ?? event?.admin?.logo} alt="image" />
                                        </div>
                                        <div onClick={() => setShowHost(true)} className=" flex flex-col items-center justify-center " >
                                            <div className=" font-bold text-[10px] flex justify-center items-center text-white bg-[#37137FBF] rounded h-[18px] w-[75px] " >
                                                Event Host:
                                            </div>
                                            <p className=" font-bold text-[12px] text-center text-white " >{textLimit(event?.admin?.fullname ? event?.admin?.fullname : event?.admin?.name, 14)}</p>
                                        </div>
                                    </div>
                                    <div className=" w-full " >
                                        <CustomButton onClick={() => setShow(true)} bgColor="#ffffff" rounded="44px" width="100%" height="50px" color="#37137f"  >Join Event</CustomButton>
                                    </div>
                                </div>
                                <div className=" w-full p-4 flex flex-col gap-2 shadow rounded-[10px] bg-white " >
                                    <p className=" font-bold text-lg capitalize text-primary " >{textLimit(event?.name, 70)}</p>
                                    <div className=" w-full flex gap-3 items-center justify-between " >
                                        <div className=" flex gap-2 " >
                                            <div className=" w-fit mt-[2px] text-primary text-opacity-50 " >
                                                <LocationIcon block={true} />
                                            </div>
                                            <p className=" font-semibold text-sm " >{event?.meetingLink ? "Online" : event?.address}</p>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-2 " >
                                        <div className=" w-fit text-primary text-opacity-50 " >
                                            <CalendarIcon2 />
                                        </div>
                                        <p className=" font-semibold text-sm mr-2 " >{dateFormat(event?.endTime)}</p>
                                        <div className=" w-fit text-primary text-opacity-50 " >
                                            <ClockIcon />
                                        </div>
                                        <p className=" font-semibold text-sm " >{timeFormat(event?.endTime)}</p>
                                    </div>
                                    <div className=" w-full flex justify-between items-center " >
                                        {event?.ticketing?.length > 0 && (
                                            <>
                                                {event?.ticketing[0]?.signUpLimit > 0 && (
                                                    <>
                                                        <div className=" flex gap-2 items-center " >
                                                            <TicketIcon />
                                                            <Text className=" font-bold text-sm " >{totalTickets === 0 ? "Sold Out" : "Ticket Available"} </Text>
                                                        </div>
                                                    </>
                                                )}
                                                {(event?.ticketing[0]?.signUpLimit === 0 || !event?.ticketing[0]?.signUpLimit) && (
                                                    <>
                                                        {event?.ticketing?.length > 0 && (
                                                            <div className=" flex gap-2 items-center " >
                                                                {(event?.ticketing[0]?.spotsLeft > 0 || !event?.ticketing[0]?.signUpLimit || event?.ticketing[0]?.signUpLimit === 0) && (
                                                                    <TicketIcon />
                                                                )}
                                                                {event?.ticketing[0]?.spotsLeft === undefined && (
                                                                    <Text className=" font-bold text-sm " >{"Ticket Available"} </Text>
                                                                )}
                                                                {event?.ticketing[0]?.spotsLeft > 0 && (
                                                                    <Text className=" font-bold text-sm " >{"Ticket Available"} </Text>
                                                                )}
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                    
                                    {(event?.ticketing[0]?.signUpLimit === 0 || !event?.ticketing[0]?.signUpLimit) && (
                                        <div className=" flex items-center gap-2 " >
                                            <HiTicket />
                                            {event?.ticketing?.length > 1 && (
                                                <p className=" text-sm font-medium " >From</p>
                                            )}
                                            <p className=" text-sm font-medium " >{minPrice === 0 ? "Free" : formatNumber(minPrice / 100, event?.currency as any)}</p>
                                        </div>
                                    )}

                                    {event?.ticketing[0]?.signUpLimit > 0 && (
                                        <>
                                            {totalTickets > 0 && (
                                                <div className=" flex items-center gap-2 " >
                                                    <HiTicket />
                                                    {event?.ticketing?.length > 1 && (
                                                        <p className=" text-sm font-medium " >From</p>
                                                    )}
                                                    <p className=" text-sm font-medium " >{minPrice === 0 ? "Free" : formatNumber(minPrice / 100, event?.currency as any)}</p>
                                                </div>
                                            )}
                                        </>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-4 w-full  px-4 py-4 " >
                            <div className=" w-full flex flex-col items-center " >
                                <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] mb-3 flex justify-center items-center "  >
                                    <Text className=" font-bold text-sm " >About Event</Text>
                                </div>

                                <div className=" w-full flex flex-col " >
                                    {paragraphs?.map((text, i) => (
                                        <Text key={i} className="leading-tight mb-[16px] text-primary text-left text-opacity-90 text-sm last:mb-0">
                                            {text}
                                        </Text>
                                    ))}
                                </div>

                            </div>
                            {event?.eventPledge?.minimumPledge > 0 && (
                                <div className=" flex w-full gap-3 items-center justify-center " >
                                    <div className=" flex flex-col gap-2 items-center " >
                                        <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                            <Text className=" font-bold text-sm " >Charity Partner(s)</Text>
                                        </div>
                                        <CustomButton onClick={() => setShowPartner(true)} hasIcon icon={<IoMdEye size={"20px"} />} rounded="44px" width="100%" height="50px"  >
                                            View Charity Partner(s)
                                        </CustomButton>
                                    </div>
                                </div>
                            )}
                        </div>
                        {event?.address && (
                            <div className=" w-full px-6 flex flex-col gap-1 " >
                                <Text className=" font-bold text-sm " >Location Map</Text>
                                <ViewMap lat={event?.loc?.coordinates[1]} lng={event?.loc?.coordinates[0]} />
                            </div>
                        )}
                    </div>
                    <div className=" w-full flex flex-col relative gap-6 lg:px-0 px-4 " >
                        {event?.fundRaiser?.fundRaisingGoal > 0 && (
                            <div className=" w-full rounded-[44px] flex flex-col lg:p-6 items-center " >
                                <p className="  text-primary font-bold " >Fundraising Goal</p>
                                <p className=" text-[#858D9D] text-xs font-medium " >Funds needed to make a difference.</p>
                                <ChartGraph />
                                <p className=" text-[#667085] font-medium text-center text-sm " >This event received donations of <span style={{ color: "#37137F" }} >{formatNumber(event?.fundRaiser?.fundRaised)}</span> today.</p>
                                <div className=" w-full px-2 flex justify-between pt-2 " >
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-medium text-[#667085] text-sm " >Target</p>
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >{formatNumberWithKCurrency(event?.fundRaiser?.fundRaisingGoal / 100, event?.currency as any)}</p>
                                    </div>
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-medium text-[#667085] text-sm " >Donated</p>
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >{formatNumber(event?.fundRaiser?.fundRaised / 100, event?.currency as any)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {event?.eventPledge?.minimumPledge > 0 && (
                            <div className=" w-full rounded-[44px] flex flex-col lg:p-6 items-center " >

                                <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                    <Text className=" !font-bold text-sm " >Pledge</Text>
                                </div>
                                <p className=" text-[#858D9D] max-w-[350px] mt-2 text-center text-sm font-medium " >When you join then event, you will have the chance to support our community effort with a donation, Your contribution helps us continue this important work.</p>
                                {/* <ChartGraphPledge /> */}
                                <div className=" w-full h-[180px] flex px-6 flex-col items-center justify-center relative my-4 " >
                                    <div className=" max-w-[400px] w-full h-[200px] relative  " >

                                        <div className=" max-w-[400px] w-full h-[200px] absolute top-0 left-auto right-auto flex justify-center rounded-t-full border-t-4 border-l-4 border-r-4 border-primary " />
                                        {/* <div className=" w-4 h-4 absolute -bottom-[5px] -right-[4px] z-30 rounded-full bg-[#37137F] " /> */}
                                    </div>
                                </div>
                                <div className=" w-full px-2 flex justify-center -mt-24 " >
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-semibold text-2xl " >{formatNumberWithKCurrency(event?.eventPledge?.minimumPledge / 100, event?.currency as any)}</p>
                                        <p className=" font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-sm " >Minimum Pledge</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className=" w-full flex bg-white relative z-10 flex-col items-center lg:px-0 px-4 lg:pt-4 pt-4 pb-36 " >
                            <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                <p className=" font-bold text-sm " >Event Countdown</p>
                            </div>
                            <CountdownTimer targetTime={event?.endTime} />
                        </div>
                        <div className=" w-full hidden flex-col mt-auto items-center py-4 lg:flex px-4 " >
                            {event?.fundRaiser?.fundRaisingGoal && (
                                <CustomButton onClick={() => setOpen(true)} rounded="44px" width="100%" height="50px"  >Give Now</CustomButton>
                            )}
                        </div>
                    </div>
                    <div style={{ boxShadow: "0px -4px 8px 0px #00000026" }} className=" w-full flex lg:hidden flex-col items-center fixed bottom-0 py-5 bg-white z-50 px-4 " >
                        {event?.fundRaiser?.fundRaisingGoal ? (
                            <CustomButton onClick={() => setOpen(true)} rounded="44px" width="100%" height="50px"  >Give Now</CustomButton>
                        ) : (
                            <CustomButton onClick={() => setShow(true)} rounded="44px" width="100%" height="50px"  >Join Event</CustomButton>
                        )}
                    </div>
                </div>

                <ModalLayout width=" lg:max-w-[500px] max-w-full w-full " height=" h-fit " rounded="24px" open={open} setOpen={setOpen} >
                    <DonateForm setOpen={setOpen} />
                </ModalLayout>

                <ModalLayout width=" lg:max-w-[500px] max-w-full w-full " rounded="24px" open={showPartner} setOpen={setShowPartner} >
                    {/* <DonateForm setOpen={setOpen} /> */}
                    <div className=" w-full flex flex-col " >
                        <div className=" flex w-full justify-center " >
                            <p className=" text-primary text-center font-extrabold " >Charity Partner(s)</p>
                        </div>
                        <div className=" mt-6 flex flex-col max-h-[70vh] overflow-y-auto h-[70vh] gap-3 " >
                            {event?.eventPledge?.organizations?.map((item) => {
                                return (
                                    <div className=" w-full flex items-center gap-2 shadow rounded-xl p-3 " >
                                        <div className=" w-[64px] h-[64px] rounded-2xl " >
                                            <img src={item?.logo} alt="logo" className=" w-full h-full object-cover rounded-2xl " />
                                        </div>
                                        <div className=" flex flex-col " >
                                            <p className=" text-sm !font-extrabold " >{capitalizeFLetter(item?.name)}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </ModalLayout>
                <ModalLayout onIcon width=" lg:max-w-[390px] max-w-full w-full " height=" h-[100vh] " rounded="24px" open={show} setOpen={setShow} >
                    <EventTicketForm convert={currencyData} setOpen={setShow} event={event} />
                </ModalLayout>
                <ModalLayout width=" max-w-[400px] " rounded="24px" open={showImg} setOpen={setShowImg} >
                    <div className=" w-full rounded-full pt-2 " >
                        <img className=" w-full h-full rounded-[24px] object-contain " src={showType === "event" ? event?.photo : event?.admin?.photo ? event?.admin?.photo : event?.admin?.logo} alt="image" />
                    </div>
                </ModalLayout>


                <ModalLayout onIcon={true} width=" max-w-[400px] " rounded="24px" open={showHost} setOpen={setShowHost} >
                    <div className=" pb-3 px-4 flex flex-col gap-4 " >
                        <div className=" w-full flex items-center justify-center gap-3 px-2 bg-[#37137F4D] bg-opacity-30 rounded-[10px] py-3 " >
                            <div onClick={() => handleShowType("host")} className=" w-[44px] h-[44px] rounded-full " >
                                <img className=" w-full h-full rounded-full object-cover " src={event?.admin?.photo ? event?.admin?.photo : event?.admin?.logo} alt="image" />
                            </div>
                            <div className=" flex flex-col gap-1 " >
                                <div className=" font-bold text-[12px] flex justify-center items-center text-white bg-[#37137FBF] rounded h-[20px] w-[80px] " >
                                    Event Host:
                                </div>
                                <p className=" font-bold text-[14px] text-center text-[#37137F] " >{event?.admin?.fullname ?? event?.admin?.name}</p>
                            </div>
                        </div>
                        <div onClick={() => setShowHost(false)} role="button" className=" w-full flex justify-center items-center text-[#CC1B1B] font-semibold text-sm cursor-pointer " >
                            Close
                        </div>
                    </div>
                </ModalLayout>
            </LoadingAnimation>
        </>
    )
}

export default SharePage
