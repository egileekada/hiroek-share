
import * as Dialog from '@radix-ui/react-dialog'; 
import type { ReactNode } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';



export default function ModalLayout(props: {
    children: ReactNode;
    onIcon?: boolean;
    open: boolean;
    title?: string;
    width?: string;
    height?: string;
    rounded?: string;
    setOpen: (by: boolean) => void
}) {

    const {
        open,
        onIcon,
        setOpen,
        title,
        width,
        height,
        rounded
    } = props

    return (
        <Dialog.Root open={open} >
            <Dialog.Portal  >
                <Dialog.Overlay onClick={() => setOpen(false)} className="DialogOverlay bg-black bg-opacity-40 " />
                <Dialog.Content style={{ height: height ? height : "fit-content", borderRadius: rounded ?? "16px", paddingTop: title ? "0px" : "30px" }} className={` ${width ? width : " max-w-[450px] "} DialogContent relative  `}>
                    {title && (
                        <div className='w-full h-10 flex items-center justify-center ' >
                            {title}
                        </div>
                    )}
                    {!onIcon && (
                        <div onClick={() => setOpen(false)} role='button' className=' absolute top-2 right-2 ' >
                            <IoIosCloseCircle size={"25px"} />
                        </div>
                    )}
                    <div className=' w-full flex h-full flex-col ' >
                        {props?.children}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
