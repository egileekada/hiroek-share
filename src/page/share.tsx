import { useState } from "react"
import ChartGraph from "../components/chartGraph"
// import CountdownTimer from "../components/countDownTimer"
import LoadingAnimation from "../components/loadingAnimation"
import useGetEventData from "../hooks/useGetEventData"
import { LocationIcon, CalendarIcon2, ClockIcon, TicketIcon, BackArrowIcon } from "../svg"
import { dateFormat, timeFormat } from "../utils/dateFormat"
import { formatNumberWithK } from "../utils/formatNumberWithK"
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
import type { IUserDetail } from "../model/user"
import { useQuery } from "../utils/useQuery"
import { useNavigate } from "react-router-dom"
import ChartGraphPledge from "../components/chartGraphPledge"

function SharePage() {

    const { isLoading, data: event } = useGetEventData()?.getEventData()
    const { data: user } = useGetUserData().getCurrentUserData()


    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [showPartner, setShowPartner] = useState(false)
    const [showHost, setShowHost] = useState(false)
    const navigate = useNavigate()

    const totalTickets = event?.ticketing?.reduce((sum, ticket) => sum + ticket?.spotsLeft, 0);
    // const totalTickets = event?.ticketing?.reduce((sum, ticket) => sum + ticket?.spotsLeft, 0);

    const query = useQuery();

    const back = query.get("back");


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
                            <div className=" absolute z-10 inset-0 bg-[#0000004D] " />
                        </div>
                        <div className=" w-full -mt-[150px] z-20 px-3  " >
                            <div className=" w-full rounded-2xl flex flex-col gap-2 " >

                                <div className=" w-full flex gap-4" >
                                    <div role="button" onClick={() => setShowHost(true)} className=" w-full flex items-center justify-center gap-2 px-2 bg-[#FFFFFF4D] bg-opacity-30 rounded-[10px] h-[50px] " >

                                        <div className=" w-8 h-8 rounded-full " >
                                            <img className=" w-full h-full rounded-full object-cover " src={event?.admin?.photo ?? event?.admin?.logo} alt="image" />
                                        </div>
                                        <div className=" flex flex-col items-center justify-center " >
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
                                            <div className=" w-fit text-primary text-opacity-50 " >
                                                <LocationIcon block={true} />
                                            </div>
                                            <p className=" font-semibold text-xs " >{event?.address}</p>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-2 " >
                                        <div className=" w-fit text-primary text-opacity-50 " >
                                            <CalendarIcon2 />
                                        </div>
                                        <p className=" font-semibold text-xs mr-2 " >{dateFormat(event?.endTime)}</p>
                                        <div className=" w-fit text-primary text-opacity-50 " >
                                            <ClockIcon />
                                        </div>
                                        <p className=" font-semibold text-xs " >{timeFormat(event?.endTime)}</p>
                                    </div>
                                    <div className=" w-full flex justify-between items-center " >
                                        {event?.members?.length > 0 && (
                                            <div className='flex items-center mt-2 bg-[#37137F4D] px-3 rounded-full w-fit h-[40px] text-black ' >
                                                <div className=' w-7 h-7 rounded-full flex justify-center items-center bg-gray-200 '>
                                                    <p className=" text-primary text-xs " >{(event?.members[0]?.fullname).slice(0, 1)}</p>
                                                    <p className=" text-primary text-xs " >{(event?.members[0]?.fullname).slice(1, 2)}</p>
                                                </div>
                                                {event?.members?.length > 1 && (

                                                    <div className=' w-7 h-7 rounded-full flex justify-center items-center bg-gray-200 -ml-2 '>
                                                        <p className=" text-primary text-xs " >{(event?.members[1]?.fullname).slice(0, 1)}</p>
                                                        <p className=" text-primary text-xs " >{(event?.members[1]?.fullname).slice(1, 2)}</p>
                                                    </div>
                                                )}
                                                {event?.members?.length > 2 && (
                                                    <div className=' w-7 h-7 rounded-full flex justify-center items-center bg-gray-200 -ml-2 '>
                                                        <p className=" text-primary text-xs " >{(event?.members[2]?.fullname).slice(0, 1)}</p>
                                                        <p className=" text-primary text-xs " >{(event?.members[2]?.fullname).slice(1, 2)}</p>
                                                    </div>
                                                )}
                                                <Text className=' ml-2 font-semibold text-xs text-[#37137F] ' >{formatNumberWithK(event?.members?.length)} Attending</Text>
                                            </div>
                                        )}
                                        {event?.ticketing?.length > 0 && (
                                            <div className=" flex gap-2 items-center " >
                                                {(event?.ticketing[0]?.spotsLeft > 0 || !event?.ticketing[0]?.signUpLimit || event?.ticketing[0]?.signUpLimit === 0) && (
                                                    <TicketIcon />
                                                )}
                                                {event?.ticketing[0]?.spotsLeft === undefined && (
                                                    <Text className=" font-bold text-xs " >{totalTickets > 0 ? ` ${totalTickets} Ticket${totalTickets === 1 ? "" : "(s)"} Available` : "Tickets Available"} </Text>
                                                )}
                                                {event?.ticketing[0]?.spotsLeft > 0 && (
                                                    <Text className=" font-bold text-xs " >{totalTickets > 0 ? ` ${totalTickets} Ticket${totalTickets === 1 ? "" : "(s)"} Available` : "Tickets Available"} </Text>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex flex-col gap-4 w-full  px-4 py-4 " >
                            <div className=" w-full flex flex-col items-center lg:pt-4 pt-4 " >
                                <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                    <Text className=" !font-extrabold text-xs " >About Event</Text>
                                </div>
                                <Text className=" text-primary text-center text-opacity-90 text-xs font-medium !leading-[18px] mt-2 " >{event?.description}</Text>

                            </div>
                            {/* <div className=" flex flex-col gap-3 items-center " >
                                <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                    <Text className=" font-extrabold text-xs " >Tickets Available</Text>
                                </div>
                                {event?.ticketing?.map((item, index) => {
                                    return (
                                        <div role="button" key={index} onClick={() => clickHandler(item)} className=" w-full justify-start items-center flex border rounded-lg  px-4 h-[96px] " >
                                            <div key={index} className=" lg:max-w-[360px] w-full flex flex-col gap-1 justify-center" >
                                                <p className=" text-xs font-semibold " >{item?.ticketType}</p>
                                                <p className=" font-semibold " >{formatNumber(item?.ticketPrice/100)}</p>
                                                <p className=" text-xs font-semibold ">Sales End On {dateFormat(item?.salesEndDate)}</p>
                                            </div> 
                                        </div>
                                    )
                                })}
                            </div> */}
                            {event?.eventPledge?.minimumPledge > 0 && (
                                <div className=" flex w-full gap-3 items-center justify-center " >
                                    <div className=" flex flex-col gap-2 items-center " >
                                        <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                            <Text className=" font-extrabold text-xs " >Charity Partner(s)</Text>
                                        </div>

                                        <CustomButton onClick={() => setShowPartner(true)} hasIcon icon={<IoMdEye size={"20px"} />} rounded="44px" width="100%" height="50px"  >
                                            View Charity Partner(s)
                                        </CustomButton>
                                    </div>
                                </div>
                            )}
                        </div>
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
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >£{formatNumberWithK(event?.fundRaiser?.fundRaisingGoal / 100)}</p>
                                    </div>
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-medium text-[#667085] text-sm " >Donated</p>
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >{formatNumber(event?.fundRaiser?.fundRaised / 100)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {event?.eventPledge?.minimumPledge > 0 && (
                            <div className=" w-full rounded-[44px] flex flex-col lg:p-6 items-center " >

                                <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                    <Text className=" !font-extrabold text-xs " >Pledge</Text>
                                </div>
                                <p className=" text-[#858D9D] max-w-[350px] mt-2 text-center text-xs font-medium " >When you join then event, you will have the chance to support our community effort with a donation, Your contribution helps us continue the important work.</p>
                                {/* <ChartGraphPledge /> */}
                                <div className=" w-full h-[180px] flex px-6 flex-col items-center justify-center relative my-4 " >
                                    <div className=" max-w-[400px] w-full h-[200px] absolute top-0 left-auto right-auto flex justify-center rounded-t-full border-t-4 border-l-4 border-r-4 border-primary " />
                                    <div className=" w-4 h-4 absolute -bottom-[5px] -right-[4px] z-30 rounded-full bg-[#37137F] " />
                                </div>
                                <div className=" w-full px-2 flex justify-center -mt-24 " >
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-semibold text-2xl " >£{formatNumberWithK(event?.eventPledge?.minimumPledge / 100)}</p>
                                        <p className=" font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-sm " >Minimum Pledge</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className=" w-full flex bg-white relative z-10 flex-col items-center lg:px-0 px-4 lg:pt-4 pt-4 pb-36 " >
                            <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                <p className=" font-extrabold text-xs " >Event Countdown</p>
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

                <ModalLayout width=" lg:max-w-[500px] max-w-full w-full " height=" h-[100%] " rounded="24px" open={showPartner} setOpen={setShowPartner} >
                    {/* <DonateForm setOpen={setOpen} /> */}
                    <div className=" w-full flex flex-col h-[90vh] overflow-y-auto " >
                        <div className=" flex w-full justify-center " >
                            <p className=" text-primary text-center font-extrabold " >Charity Partner(s)</p>
                        </div>
                        <div className=" mt-6 flex flex-col gap-3 " >
                            {event?.eventPledge?.organizations?.map((item) => {
                                return (
                                    <div className=" w-full flex items-center gap-2 shadow rounded-xl p-3 " >
                                        <div className=" w-[64px] h-[64px] rounded-2xl " >
                                            <img src={item?.logo} alt="logo" className=" w-full h-full object-cover rounded-2xl " />
                                        </div>
                                        <div className=" flex flex-col " >
                                            <p className=" text-sm !font-extrabold " >{capitalizeFLetter(item?.name)}</p>
                                            <p className=" text-xs " >{item?.address}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </ModalLayout>
                <ModalLayout onIcon width=" lg:max-w-[390px] max-w-full w-full " height=" h-[100vh] " rounded="24px" open={show} setOpen={setShow} >
                    <EventTicketForm user={user as unknown as IUserDetail} setOpen={setShow} event={event} />
                </ModalLayout>
                <ModalLayout onIcon={true} width=" max-w-[400px] " rounded="24px" open={showHost} setOpen={setShowHost} >
                    <div className=" pb-3 px-4 flex flex-col gap-4 " >
                        <div className=" w-full flex items-center justify-center gap-3 px-2 bg-[#37137F4D] bg-opacity-30 rounded-[10px] py-3 " >
                            <div className=" w-[44px] h-[44px] rounded-full " >
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
