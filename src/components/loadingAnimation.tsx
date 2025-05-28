
import React, { useEffect, useState } from 'react'

interface Props {
    loading: boolean,
    refeching?: boolean,
    children: React.ReactNode,
    length?: number,
    customLoader?: React.ReactNode,
    width?: string
}

function LoadingAnimation(props: Props) {

    let {
        children,
        loading,
        length,
        refeching,
        customLoader,
        width
    } = props

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        // Set a 3-second timeout
        if (!loading) {
            const timeoutId = setTimeout(() => {
                setLoading(false);
            }, 1000);

            // Cleanup: clear the timeout if the component unmounts or a new timer is set
            return () => clearTimeout(timeoutId);
        }

    }, [loading])

    return (
        <div className={` ${width ? width : "w-full h-full "}  bg-white `} >
            {(!loading && !isLoading) && (
                <div className=' w-full h-full ' >
                    {children}
                    {((!loading) && refeching && length) && (
                        <div className=' w-full  flex ' >
                            <div className=' w-full flex justify-center text-lg ' >
                                {length > 0 ? (
                                    <p>Loading...</p>
                                ): (
                                    <img className=' w-16 h-16 ' alt='loading' src='/images/loading.gif' />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {((!loading && !isLoading)) && (
                <>
                    {length === 0 && (
                        <div className=' w-full flex justify-center text-lg py-4 '  >
                            <p>No Records Found</p>
                        </div>
                    )}
                </>
            )}

            {(loading || isLoading) && (
                <div className=' w-full flex ' >
                    {!customLoader && (
                        <div className=' w-full flex justify-center  py-4 text-lg ' >

                            <img className=' w-16 h-16 ' alt='loading' src='/images/loading.gif' />
                        </div>
                    )}
                    {customLoader}
                </div>
            )}
        </div>
    )
}

export default LoadingAnimation