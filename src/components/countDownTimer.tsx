import { useState, useEffect } from "react";

const CountdownTimer = ({ targetTime }: { targetTime: string }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = new Date(targetTime).getTime() - new Date().getTime();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer); // Clean up on unmount
    }, [targetTime]);

    return (
        <div className=" w-fit flex gap-3 mt-4 " >
            <div className=" flex gap-2 flex-col items-center " >
                <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] " >
                    <p className=" pt-2 " >{timeLeft.days}</p>
                </div>
                <p className=" text-xs text-primary font-black " >Days</p>
            </div>
            <div className=" flex gap-2 flex-col items-center " >
                <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] " >
                    <p className=" pt-2 " >{timeLeft.hours}</p>
                </div>
                <p className=" text-xs text-primary font-black " >Hours</p>
            </div>
            <div className=" flex gap-2 flex-col items-center " >
                <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] " >
                    <p className=" pt-2 " >{timeLeft.minutes}</p>
                </div>
                <p className=" text-xs text-primary font-black " >Minutes</p>
            </div>
            <div className=" flex gap-2 flex-col items-center " >
                <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] " >
                    <p className=" pt-2 " >{timeLeft.seconds}</p>
                </div>
                <p className=" text-xs text-primary font-black " >Seconds</p>
            </div>
        </div>
    );
};

export default CountdownTimer;
