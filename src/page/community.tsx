import { Text } from "@radix-ui/themes";
import useGetCommunityById from "../hooks/useGetCommunityById";
import { formatNumberWithK } from "../utils/formatNumberWithK";
import LoadingAnimation from "../components/loadingAnimation";
import ModalLayout from "../components/shared/modalLayout";
import CustomButton from "../components/shared/customButton";
import { useState } from "react";


export default function ChannelsPage() {

    const { data: item, isLoading } = useGetCommunityById()

    const [show, setShow] = useState(false)

    return (
        <LoadingAnimation loading={isLoading} > 
            <div className=" w-full h-full p-4 flex flex-col gap-4 items-center " >
                <div className=" w-full max-w-[500px] flex flex-col gap-4  " > 
                    <div className=" w-full h-[240px] relative rounded-b-[24px] rounded-[24px] "  >
                        <img alt="image" src={item?.photo} className=" w-full h-full object-cover rounded-[24px] " />
                        <div className=" p-5 text-white absolute bottom-2 inset-x-2 gap-2 bg-[#37137FCC] flex flex-col rounded-[24px] items-center " style={{ boxShadow: "0px 3px 3px 0px #00000038" }} >
                            <Text className=" font-black text-2xl capitalize text-center " >{item?.name}</Text>
                            {/* <Text className=" text-xs font-semibold text-center " >{item?.description}</Text> */}

                            {item?.members?.length > 0 && (
                                <div role="button" className='flex items-center mt-2 bg-[#FFFFFF26] px-3 rounded-full w-fit h-[40px] mx-auto text-black ' >
                                    <div className=' w-7 h-7 rounded-full'>
                                        <img src={item?.members[0]?.photo} alt={item?.members[0]?._id} className=" w-full h-full object-cover rounded-full " />
                                    </div>
                                    {item?.members?.length > 1 && (
                                        <div className=' w-7 h-7 rounded-full -ml-2 ' >
                                            <img src={item?.members[1]?.photo} alt={item?.members[1]?._id} className=" w-full h-full object-cover rounded-full " />
                                        </div>
                                    )}
                                    {item?.members?.length > 2 && (
                                        <div className=' w-7 h-7 rounded-full -ml-2 ' >
                                            <img src={item?.members[2]?.photo} alt={item?.members[2]?._id} className=" w-full h-full object-cover rounded-full " />
                                        </div>
                                    )}
                                    <Text className=' ml-2 font-semibold text-xs text-white ' >{formatNumberWithK(item?.members?.length)} Members</Text>
                                </div>
                            )}
                        </div>
                    </div>

                    <CustomButton onClick={() => setShow(true)} rounded="10px" width="100%" height="50px"  >Join Channel</CustomButton>
                </div>
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
            </div>
        </LoadingAnimation>
    )
}
// 670e447270be6b0ed3cd7f02 