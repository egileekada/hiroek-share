import { useEffect, useState } from "react";
import CustomButton from "./shared/customButton";
import { formatNumber } from "../utils/numberFormat";
import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";
import type { IEvent, IEventTicket } from "../model/event";
import { dateFormat } from "../utils/dateFormat";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiInformationFill } from "react-icons/ri";
import CustomInput from "./shared/input";
import useAuth from "../hooks/useAuth";
import { FormikProvider } from "formik";

export default function EventTicketForm({ ticket, event }: { setOpen?: any, ticket: IEventTicket, event: IEvent }) {

    const { formikSignup, signupMutation, formikVerify, verifyMutation, formik, loginMutation, tab, setTab, payForTicket, payForTicketFree, email, forgotMutation, formikForgotPassword } = useAuth()

    const [ticketNo, setTicketNo] = useState(1)

    useEffect(() => {
        if (!formikVerify?.values?.phoneOrEmail) {
            formikVerify.setFieldValue("phoneOrEmail", email)
        }
    }, [email])

    const handleSubmit = () => {
        if (ticket.ticketPrice > 0) {
            payForTicket.mutate({
                eventId: event?._id,
                ticketTypes: [
                    {
                        numberOfTickets: ticketNo,
                        ticketTypeId: ticket?._id
                    }
                ]
            })
        } else {
            payForTicketFree.mutate({
                eventId: event?._id,
                ticketTypes: [
                    {
                        numberOfTickets: ticketNo,
                        ticketTypeId: ticket?._id
                    }
                ]
            })
        }
    }

    const clickTicket = (type: "remove" | "add") => {
        if (ticketNo > 0 && type === "remove") {
            setTicketNo((prev) => prev - 1)
        } else if (type === "add") {
            setTicketNo((prev) => prev + 1)
        }
    }

    const servicefee = 0.6 + (Number(ticket?.ticketPrice) * 0.015) + 0.2

    return (
        <>
            {tab === 0 && (
                <FormikProvider value={formikSignup}>
                    <form onSubmit={formikSignup.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
                        <p className=" text-primary text-2xl font-bold " >Sign Up</p>
                        <p className=" text-primary20 text-xs font-medium " >Please fill in your details below.</p>
                        <div className=" w-full flex flex-col items-center gap-4 mt-3 " >
                            <CustomInput borderRadius="8px" name="fullname" label="Full Name" type="text" placeholder="" />
                            <CustomInput borderRadius="8px" name="email" label="Email Address" type="email" placeholder="" />
                            <CustomInput borderRadius="8px" name="phone" label="Phone Number" type="tel" placeholder="" />
                            <CustomInput borderRadius="8px" name="password" isPassword label="Password" type="password" placeholder="" />
                            <CustomButton type="submit" loading={signupMutation.isLoading} rounded="44px" width="100%" height="50px"  >Proceed</CustomButton>
                            <p className=" text-primary20 text-xs font-medium " >Already have an account? <span className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(3)} >Login</span></p>
                        </div>
                    </form>
                </FormikProvider>
            )}
            {tab === 1 && (
                <FormikProvider value={formikVerify}>
                    <form onSubmit={formikVerify.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
                        <p className=" text-primary text-2xl font-bold " >Verify OTP</p>
                        <p className=" text-primary20 text-xs font-medium " >Please enter the OTP sent to your email.</p>
                        <div className=" w-full flex flex-col items-center gap-4 mt-3 " >

                            <div className=" w-full flex items-center justify-center gap-2 pt-2 pb-4 ">

                                <OneTimePasswordField.Root
                                    // autoSubmit
                                    value={formikVerify.values.otp}
                                    // onAutoSubmit={formikVerify.handleSubmit}
                                    onValueChange={formikVerify.handleChange("otp")}
                                >

                                    <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
                                    <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
                                    <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
                                    <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
                                    <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
                                    <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
                                </OneTimePasswordField.Root>
                            </div>
                            <CustomButton type="submit" loading={verifyMutation.isLoading} rounded="44px" width="100%" height="50px"  >Verify</CustomButton>
                        </div>
                    </form>
                </FormikProvider>
            )}
            {tab === 3 && (
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
                        <p className=" text-primary text-2xl font-bold " >Login</p>
                        <p className=" text-primary20 text-xs font-medium " >Please fill in your details below.</p>
                        <div className=" w-full flex flex-col items-center gap-4 pb-3 " >
                            <CustomInput borderRadius="8px" name="email" label="Email Address" type="email" placeholder="" />
                            <CustomInput borderRadius="8px" name="password" isPassword label="Password" type="password" placeholder="" /> 
                            <p className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(6)} >forgot password</p>
                            <CustomButton type="submit" loading={loginMutation.isLoading} rounded="44px" width="100%" height="50px"  >Login</CustomButton>
                            <p className=" text-primary20 text-xs font-medium " >Don't have an account? <span className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(0)} >Sign Up</span></p>
                        </div>
                    </form>
                </FormikProvider>
            )}
            {tab === 6 && (
                <FormikProvider value={formikForgotPassword}>
                    <form onSubmit={formikForgotPassword.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
                        <p className=" text-primary text-2xl font-bold " >Forgot Password</p>
                        <p className=" text-primary20 text-xs font-medium " >Please fill in your details below.</p>
                        <div className=" w-full flex flex-col items-center gap-4 pb-3 " >
                            <CustomInput borderRadius="8px" name="email" label="Email Address" type="email" placeholder="" /> 
                            <CustomButton type="submit" loading={forgotMutation.isLoading} rounded="44px" width="100%" height="50px"  >Submit</CustomButton>
                            <p className=" text-primary20 text-xs font-medium " >Already have an account? <span className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(3)} >Login</span></p>
                        </div>
                    </form>
                </FormikProvider>
            )}
            {tab === 2 && (
                <div className=" w-full flex flex-col gap-4 items-center " >
                    <div className=" pb-2 w-full flex flex-col items-center border-b border-[#E8E8E8] " >
                        <p className=" text-xl font-black text-primary " >{event?.name}</p>
                        <p className=" text-xs font-bold " >{dateFormat(event?.endTime)}</p>
                        <p className=" text-xs font-semibold " >{event?.address}</p>
                    </div>
                    <div className=" w-full border rounded-xl flex items-center justify-between gap-4 p-4 " >
                        <div className=" flex flex-col " >
                            <p className=" text-xs font-semibold text-primary " >{ticket?.ticketType}</p>
                            <p className=" font-semibold text-primary " >{formatNumber(ticket?.ticketPrice)}</p>
                            <p className=" text-xs font-semibold text-primary " >{"Sale Ends On " + dateFormat(ticket?.salesEndDate)}</p>
                        </div>

                        <div className=" w-[116px] h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg " >
                            <div role="button" onClick={() => clickTicket("remove")} >
                                <AiOutlineMinusCircle size={"30px"} />
                            </div>
                            <input value={ticketNo}
                                name="signUpLimit"
                                onChange={(e) => setTicketNo(Number(e.target.value))}
                                placeholder="0"
                                type="number"
                                className=" focus:border-0 w-[40px] outline-none text-center "
                                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })} />
                            <div role="button" onClick={() => clickTicket("add")} >
                                <IoMdAddCircleOutline size={"30px"} />
                            </div>
                        </div>
                    </div>
                    <div className=" w-full p-4 bg-[#37137F1A] rounded-2xl flex flex-col " >
                        <div className=" w-full flex justify-end text-[#37137F] " >
                            <RiInformationFill size={"24px"} />
                        </div>
                        <div className=" grid grid-cols-2 text-primary gap-3 w-full mt-1 " >
                            <p className=" text-sm font-bold " >Ticket Price</p>
                            <p className=" font-black text-right " >{formatNumber(ticket?.ticketPrice)}</p>
                            <p className=" text-sm font-bold " >Service Fee</p>
                            <p className=" font-black text-right " >{formatNumber(servicefee)}</p>
                            <p className=" text-sm font-bold " >Ticket Price</p>
                            <p className=" font-black text-right " >{formatNumber(ticket?.ticketPrice + servicefee)}</p>
                        </div>
                    </div>
                    <div className=" w-full flex items-center border-t justify-between border-[#E8E8E8] " >
                        <CustomButton loading={payForTicket?.isLoading || payForTicketFree?.isLoading} isDisabled={ticketNo === 0 || payForTicket?.isLoading || payForTicketFree?.isLoading} onClick={() => handleSubmit()} rounded="44px" height="50px"  >Get Ticket (s)</CustomButton>
                    </div>
                </div>
            )}

            {tab === 4 && (
                <div className=" w-full h-full flex flex-col items-center justify-center " >
                    <div className=" flex flex-col gap-1 items-center " >
                        <p className=" text-xl font-black text-[#37137F] " >{`Congratulations, You're In!`}</p>
                        <p className=" text-sm font-medium text-primary30 " >{`Thank you for joining ${event?.name}! We're excited to have you with us.`}</p>
                    </div>
                    <img src="/images/heart.png" alt="heart" />

                    <div className=" w-full mt-auto " >
                        <CustomButton type="button" onClick={() => setTab(5)} rounded="44px" height="50px"  >View Ticket On The App </CustomButton>
                    </div>
                </div>
            )}
            {tab === 5 && (
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
            )}
        </>
    )
}