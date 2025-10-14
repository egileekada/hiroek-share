import { Text } from "@radix-ui/themes"
import { Logo } from "../../svg" 
import { useNavigate } from "react-router-dom"
import CustomButton from "./customButton"

interface IProps {
    children: React.ReactNode,
    header?: string,
    body?: string,
    hidesidebar?: boolean,
    hidefooter?: boolean
}

export default function AuthLayout({ children, header, body, hidesidebar, hidefooter }: IProps) {

    const navigate = useNavigate()

    return (
        <div className=" w-full !h-screen flex !overflow-hidden lg:bg-gradient-to-r from-[#37137F] from-[34.29%]  to-[#2E4991] to-100%  "  >
            <div className=" w-[477px] h-[477px] fixed lg:block hidden z-50 -top-[300px] -left-[270px] bg-[#FFFFFF26] rounded-r-full rounded-bl-full " />
            <div className=" w-[477px] h-[477px] fixedlg:block hidden  z-50 top-[77%] -left-[270px] bg-[#FFFFFF26] rounded-r-full rounded-bl-full " />
            <div className={` ${!hidesidebar ? "hidden" : "lg:block hidden  "} w-[477px] h-[477px] fixed z-50 -top-[300px] -right-[270px] bg-[#FFFFFF26] rounded-l-full rounded-br-full `} />
            <div className={` ${!hidesidebar ? "hidden" : "lg:block hidden  "} w-[477px] h-[477px] fixed z-50 top-[80%] -right-[270px] bg-[#FFFFFF26] rounded-l-full rounded-br-full `} />
            <div className=" w-full h-full flex flex-col justify-center relative items-center lg:px-0 px-6  " >
                {/* <div className=" w-[477px] h-[477px] fixed -top-[0px] -left-[40%] bg-[#FFFFFF26] rounded-full " /> 
                <div className=" w-[477px] h-[477px] absolute top-[80%] -left-[40%] bg-[#FFFFFF26] rounded-full " />  */}
                <div className="  rounded-full absolute top-0 w-full flex justify-center " >
                    <div className=" max-w-[450px] h-[250px] lg:hidden w-full flex justify-center relative " >
                        <div className=" w-[500px] h-[507px] bg-primary rounded-full absolute -mt-[365px]  " />
                        <div className=" w-full flex flex-col absolute top-0 pt-8 text-white items-center " >
                            <Logo />
                            <Text className=" text-[12px] font-extrabold " >FOR CHARITIES & SOCIAL<br />IMPACT ORGANISATIONS</Text>
                            {/* <Text className=" uppercase text-[32px] font-black " >Hiroek</Text>
                            <Text className=" text-xs tracking-[1%] font-medium " >FOR CHARITIES</Text> */}
                        </div>
                    </div>
                </div>
                <div className=" max-w-[450px] w-full flex flex-col items-center text-primary  lg:text-white gap-4 " >
                    <div className=" w-full flex flex-col items-center " >
                        <Text className=" uppercase lg:block hidden text-[32px] font-black " >Hiroek</Text>
                        <Text className=" lg:block hidden text-xs tracking-[1%] font-medium " >FOR CHARITIES & SOCIAL IMPACT ORGANISATIONS </Text>
                        <Text className=" text-[28px] font-black mt-4 " >{header}</Text>
                        <Text className=" text-sm tracking-[1%] font-medium " >{body}</Text>
                    </div>
                    {children}
                    {!hidefooter && (
                        <div className=" max-w-[389px] w-full lg:flex hidden flex-col font-medium text-sm text-primary lg:mt-0 mt-auto lg:text-[#FFFFFFBF] text-center gap-4 " >
                            <div className=" w-full flex h-[44px] justify-between items-center " >
                                <Text role="button" >Get In Touch</Text>
                                <Text role="button" >Privacy Policy</Text>
                                <Text role="button" >Terms of Use</Text>
                            </div>
                            <Text role="button" >Copyright MyHero Ltd © 2023. All right reserved.</Text>
                        </div>
                    )}
                </div>
                {!hidefooter ? (
                    <div className=" absolute bottom-4 max-w-[389px] w-full flex lg:hidden flex-col font-medium text-sm px-6 text-primary lg:mt-0 mt-auto lg:text-[#FFFFFFBF] text-center gap-2 " >
                        <div className=" w-full flex h-[24px] justify-between items-center " >
                            <Text role="button" >Get In Touch</Text>
                            <Text role="button" >Privacy Policy</Text>
                            <Text role="button" >Terms of Use</Text>
                        </div>
                        <Text role="button" >Copyright MyHero Ltd © 2023. All right reserved.</Text>
                    </div>
                ) : (
                    <div className=' lg:hidden absolute bottom-8 inset-x-6 ' >
                        <CustomButton onClick={() => navigate("/login")} type="button" >
                            Login
                        </CustomButton>
                    </div>
                )}

            </div>
            <div className={` w-full h-full hidden ${hidesidebar ? " hidden " : " lg:block "} `} >
                <div className=" w-full h-full rounded-bl-[150px] flex flex-col relative gap-5 px-8 pt-[10%] text-white " >
                    <div className="  absolute inset-0 bg-black rounded-bl-[150px] bg-opacity-15 z-10 " >
                        <img alt="bg1" className=" w-full h-full object-cover rounded-bl-[150px] " src="/images/bg1.png" />
                    </div>
                    <div className=" bg-[#00000080] absolute rounded-bl-[150px] inset-0 z-[12] " />
                    <Text className=" leading-[48px] relative z-20 text-[40px] text-center font-extrabold " >Get Started With 3 Easy Steps</Text>
                    <div className=" flex gap-3 relative z-20 " >
                        <div className=" w-[64px] h-[64px] rounded-full flex justify-center items-center bg-[#FFFFFF1A] text-[18px] font-bold text-[#FFFFFFBF] " >
                            1
                        </div>
                        <div className=" flex flex-col flex-1 " >
                            <Text className=" text-[24px] font-black " >Verify Organisation</Text>
                            <Text className=" text-lg font-medium " >Start by entering your organisations email To claim Your account And a verification Link Will Be Sent To Organisations email.</Text>
                        </div>
                    </div>
                    <div className=" flex gap-3 relative z-20 " >
                        <div className=" w-[64px] h-[64px] rounded-full flex justify-center items-center bg-[#FFFFFF1A] text-[18px] font-bold text-[#FFFFFFBF] " >
                            2
                        </div>
                        <div className=" flex flex-col flex-1 " >
                            <Text className=" text-[24px] font-black " >Create New Password</Text>
                            <Text className=" text-lg font-medium " >After Verifying the link sent to The email, Organisation Will Be Required To create a new password for their account.</Text>
                        </div>
                    </div>
                    <div className=" flex gap-3 relative z-20 " >
                        <div className=" w-[64px] h-[64px] rounded-full flex justify-center items-center bg-[#FFFFFF1A] text-[18px] font-bold text-[#FFFFFFBF] " >
                            3
                        </div>
                        <div className=" flex flex-col flex-1 " >
                            <Text className=" text-[24px] font-black " >Setup Organisation Profile</Text>
                            <Text className=" text-lg font-medium " >Maximise your Time Through Seamless Event Creation and Community Activation.</Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
