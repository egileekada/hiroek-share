import { useState } from "react"
import ChartGraph from "../components/chartGraph"
// import CountdownTimer from "../components/countDownTimer"
import LoadingAnimation from "../components/loadingAnimation"
import useGetEventData from "../hooks/useGetEventData"
import { LocationIcon, CalendarIcon2, ClockIcon, TicketIcon } from "../svg"
import { dateFormat, timeFormat } from "../utils/dateFormat"
import { formatNumberWithK } from "../utils/formatNumberWithK"
import { formatNumber } from "../utils/numberFormat"
import { textLimit } from "../utils/textlimit"
import CustomButton from "../components/shared/customButton"
import ModalLayout from "../components/shared/modalLayout"
import DonateForm from "../components/donateForm"
import CountdownTimer from "../components/countDownTimer"
import ChartGraphPledge from "../components/chartGraphPledge"
// import { Helmet } from 'react-helmet';

function SharePage() {

    const { isLoading, data: event } = useGetEventData()?.getEventData()

    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [showHost, setShowHost] = useState(false) 

    // const [ imageUrl, setImageUrl ] = useState("")
    // const [ eventName, setEventName ] = useState("") 

    return (
        <>
            <LoadingAnimation loading={isLoading} >
                <div className=" w-full h-screen relative flex lg:flex-row flex-col gap-6 text-primary " >
                    <div className=" w-full h-fit flex flex-col gap-4 lg:rounded-[44px] lg:p-8 " >
                        <div className=" w-full lg:h-[300px] h-[300px] relative " >
                            <img src={event?.photo} alt={event?.name} className=" w-full h-full lg:rounded-b-3xl lg:rounded-3xl object-cover " />
                            <div className=" absolute z-10 inset-0 bg-[#0000004D] " />
                            <div className=" w-full absolute !bottom-2 z-20 px-3  " >
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
                                    <div className=" w-full p-4 flex flex-col gap-1 rounded-[10px] bg-white " >
                                        <p className=" font-bold text-xs text-primary " >{textLimit(event?.name, 70)}</p>
                                        <div className=" w-full flex gap-3 items-center justify-between " >
                                            <div className=" flex gap-2 " >
                                                <div className=" w-fit text-primary text-opacity-50 " >
                                                    <LocationIcon block={true} />
                                                </div>
                                                <p className=" font-semibold text-xs mt- " >{event?.address}</p>
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
                                        <div className=" flex items-center gap-2 " >
                                            <div className=" w-fit text-primary text-opacity-50 " >
                                                <TicketIcon />
                                            </div>
                                            <p className=" font-bold text-xs " >{event?.spotsLeft} Spot(s) Available</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" w-full flex flex-col items-center lg:px-0 px-4 lg:pt-4 pt-4 " >
                            <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                <p className=" font-bold text-xs " >About Event</p>
                            </div>
                            <p className=" text-primary text-opacity-90 text-xs font-medium !leading-[18px] mt-2 " >{event?.description}</p>
                        </div>
                        {(event?.adminType !== "Organization" && event?.fundRaiser?.organizations.length > 0) && (
                            <div className=" px-4 w-full " >
                                <div className=" w-full flex flex-col items-center gap-2 lg:px-0 px-4 lg:py-4 rounded-[10px] py-4 " >
                                    <div className=" w-fit bg-[#37137F26] text-[#37137F] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                        <p className=" font-bold text-xs " >Recipient Organisation:</p>
                                    </div>
                                    <div className=" w-fit px-3 p-2 rounded-full text-white bg-[#37137F]" >
                                        <p className=" text-xs font-bold " >{event?.fundRaiser?.organizations[0]?.name}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {(event?.eventPledge?.organizations[0]?.name) && (
                            <div className=" px-4 w-full " >
                                <div className=" w-full flex flex-col items-center gap-2 lg:px-0 px-4 lg:py-4 rounded-[10px] py-4 " >
                                    <div className=" w-fit bg-[#37137F26] text-[#37137F] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                        <p className=" font-bold text-xs " >Charity Partner(s)</p>
                                    </div>
                                    <div className=" w-fit px-3 p-2 rounded-full text-white bg-[#37137F]" >
                                        <p className=" text-xs font-bold " >{event?.eventPledge?.organizations[0]?.name}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {event?.eventPledge?.totalPledgedAmount > 0 && (
                            <div className=" px-4 w-full " >
                                <div className=" w-full flex flex-col items-center gap-2 lg:px-0 px-4 lg:py-4 rounded-[10px] py-4 " >
                                    <div className=" w-fit bg-[#37137F26] text-[#37137F] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                        <p className=" font-bold text-xs " >Pledge</p>
                                    </div>
                                    <div className=" w-fit px-3 text-[#37137F]" >
                                        <p className=" text-xs font-bold " >The amount you commit to raising for charity through this event.</p>
                                    </div>
                                </div>
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
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >£{formatNumberWithK(event?.fundRaiser?.fundRaisingGoal / 100)}</p>
                                    </div>
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-medium text-[#667085] text-sm " >Donated</p>
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >{formatNumber(event?.fundRaiser?.fundRaised / 100)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {event?.eventPledge?.totalPledgedAmount > 0 && (
                            <div className=" w-full rounded-[44px] flex flex-col lg:p-6 items-center " >
                                <ChartGraphPledge />
                                <div className=" w-full px-2 flex justify-between pt-2 " >
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-medium text-[#667085] text-sm " >Target</p>
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >£{formatNumberWithK(event?.eventPledge?.minimumPledge / 100)}</p>
                                    </div>
                                    <div className=" flex flex-col items-center" >
                                        <p className=" font-medium text-[#667085] text-sm " >Donated</p>
                                        <p className=" font-semibold text-xl text-[#1D1F2C] " >{formatNumber(event?.eventPledge?.organizations[0].fundRaised / 100)}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className=" w-full flex flex-col items-center lg:px-0 px-4 lg:pt-4 pt-4 pb-36 " >
                            <div className=" w-fit bg-[#37137F26] rounded-md px-[10px] h-[25px] flex justify-center items-center "  >
                                <p className=" font-extrabold text-xs " >Event Countdown</p>
                            </div>
                            <CountdownTimer targetTime={event?.endTime} />
                        </div>
                        <div className=" w-full hidden flex-col mt-auto items-center py-4 lg:flex px-4 " >
                            {event?.fundRaiser?.fundRaisingGoal ? (
                                <CustomButton onClick={() => setOpen(true)} rounded="44px" width="100%" height="50px"  >Give Now</CustomButton>
                            ) : (
                                <CustomButton onClick={() => setShow(true)} rounded="44px" width="100%" height="50px"  >Join Event</CustomButton>
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
                <ModalLayout onIcon width=" lg:max-w-[390px] max-w-full w-full " height=" h-[100vh] " rounded="24px" open={show} setOpen={setShow} >
                    <div className=" w-full flex flex-col gap-6 items-center px-2 pb-4 " >
                        <p className=" font-bold text-primary " >Get The Full Experience In The App!</p>
                        <div className=" w-full flex flex-col gap-4 " >
                            <div className=" flex w-full justify-between items-center " >
                                <img src="/images/google.png" alt="google" className=" w-[145px] " />
                                <a href="https://play.google.com/store/apps/details?id=com.hiroek.app.hiroek" target="_blank" >
                                    <CustomButton rounded="8px" width="93px" fontSize="12px" color="#37137F" bgColor="#37137F4D" height="44px"  >Proceed</CustomButton>
                                </a>
                            </div>
                            <div className=" flex w-full justify-between items-center " >
                                <img src="/images/apple.png" alt="google" className=" w-[145px] " />
                                <a href="https://apps.apple.com/ng/app/hiroek/id6474194083" target="_blank" >
                                    <CustomButton rounded="8px" width="93px" fontSize="12px" color="#37137F" bgColor="#37137F4D" height="44px"  >Proceed</CustomButton>
                                </a>
                            </div>
                        </div>
                    </div>
                </ModalLayout>
                <ModalLayout onIcon={true} width=" max-w-[300px] " rounded="24px" open={showHost} setOpen={setShowHost} >
                    <div className=" pb-3 px-4 flex flex-col gap-4 " >
                        <div className=" w-full flex items-center justify-center gap-3 px-2 bg-[#37137F4D] bg-opacity-30 rounded-[10px] py-3 " >
                            <div className=" w-[44px] h-[44px] rounded-full " >
                                <img className=" w-full h-full rounded-full object-cover " src={event?.admin?.photo ? event?.admin?.photo : event?.admin?.logo} alt="image" />
                            </div>
                            <div className=" flex flex-col justify-center gap-1 " >
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
