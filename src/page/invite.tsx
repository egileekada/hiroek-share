import CustomButton from "../components/shared/customButton";
import ModalLayout from "../components/shared/modalLayout";




export default function InvitePage() {


    const close = () =>{}

    return (
        <> 
            <ModalLayout onIcon width=" lg:max-w-[390px] max-w-full w-full " height=" h-[100vh] " rounded="24px" open={true} setOpen={close} >
                <div className=" w-full flex flex-col gap-6 items-center px-2 pb-4 " >
                    <p className=" font-bold text-primary " >Get The Full Experience In The App!</p>
                    <div className=" w-full flex flex-col gap-4 " >
                        <div className=" flex w-full justify-between items-center " >
                            <img src="/images/google.png" alt="google" className=" w-[145px] " />
                            <a href="https://play.google.com/store/apps/details?id=com.hiroek.app.hiroek" target="_blank" >
                                <CustomButton rounded="8px" width="93px" fontSize="12px" color="#37137F" bgColor="#37137F4D" height="44px"  >Download</CustomButton>
                            </a>
                        </div>
                        <div className=" flex w-full justify-between items-center " >
                            <img src="/images/apple.png" alt="google" className=" w-[145px] " />
                            <a href="https://apps.apple.com/ng/app/hiroek/id6474194083" target="_blank" >
                                <CustomButton rounded="8px" width="93px" fontSize="12px" color="#37137F" bgColor="#37137F4D" height="44px"  >Download</CustomButton>
                            </a>
                        </div>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}
