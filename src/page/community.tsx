import { Text } from "@radix-ui/themes";
import useGetCommunityById from "../hooks/useGetCommunityById";
import { formatNumberWithK } from "../utils/formatNumberWithK";
import LoadingAnimation from "../components/loadingAnimation";
import ModalLayout from "../components/shared/modalLayout";
import CustomButton from "../components/shared/customButton";
import { textLimit } from "../utils/textlimit";
import useAuth from "../hooks/useAuth";
import CommunityModal from "../components/communityModal";
import useGetUserData from "../hooks/useGetUserData";


export default function ChannelsPage() {

    const { data: item, isLoading } = useGetCommunityById()

    const { data: user } = useGetUserData().getCurrentUserData()
    const { joinChannel, tab, setTab, open, setOpen } = useAuth()


    const handleClick = () => {
        joinChannel?.mutate(item?._id)
    }

    const handleOpen = () => {  
        setTab(6)
        setOpen(true)
    } 

    return (
        <LoadingAnimation loading={isLoading} >
            <div className=" w-full h-full p-4 flex flex-col gap-4 items-center " >
                <div className=" w-full max-w-[500px] flex flex-col gap-4  " >
                    <div className=" w-full h-[240px] relative rounded-b-[24px] rounded-[24px] "  >
                        <img alt="image" src={item?.photo} className=" w-full h-full object-cover rounded-[24px] " />
                        <div className=" p-5 text-white absolute bottom-2 inset-x-2 gap-2 bg-[#37137FCC] flex flex-col rounded-[24px] items-center " style={{ boxShadow: "0px 3px 3px 0px #00000038" }} >
                            <Text className=" font-black text-2xl capitalize text-center " >{textLimit(item?.name, 30)}</Text>
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
                    {!user?._id && (
                        <CustomButton onClick={() => setOpen(true)} rounded="10px" width="100%" height="50px"  >Request To Join Channel</CustomButton>
                    )}
                    {user?._id &&
                        !item?.members?.some((m) => m?._id === user?._id) && (
                            <CustomButton onClick={handleClick} loading={joinChannel?.isLoading} rounded="10px" width="100%" height="50px"  >Join Channel</CustomButton>
                        )}

                    {item?.members?.some((m) => m?._id === user?._id) && (
                        <CustomButton onClick={handleOpen} loading={joinChannel?.isLoading} rounded="10px" width="100%" height="50px"  >View Channel On The App</CustomButton>
                    )}
                </div>
                <ModalLayout onIcon width=" lg:max-w-[390px] max-w-full w-full " height=" h-[100vh] " rounded="24px" open={open} setOpen={setOpen} >
                    <CommunityModal user={user as any} setOpen={setOpen} tab={tab} setTab={setTab} />
                </ModalLayout>
            </div>
        </LoadingAnimation>
    )
}
// 670e447270be6b0ed3cd7f02 