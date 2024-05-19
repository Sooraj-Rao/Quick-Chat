import React from 'react'
import { useConversion } from '../Zustand/useConversation';

const ViewDp = () => {
    const { setUserUrl, userUrl } = useConversion();
    return (
        <div onClick={() => setUserUrl(null)} className='  h-screen w-screen bg-black/50 duration-500 z-[100] fixed top-0 left-0 flex justify-center  '>
            <div className=''>
                <h1 className=' my-20 text-center text-white'>Tap anywhere to close</h1>
                <div className=' h-60 w-60 bg-slate-400 rounded-full '>
                    <img loading='lazy' src={userUrl} alt="" />
                </div>
            </div>
        </div>
    )
}

export default ViewDp