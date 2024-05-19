import React from 'react'

const MessageLoader = () => {
    return (
        <>
            {
                Array(6).fill('').map((item, i) => {
                    return (
                        <div key={i} className={` flex  mt-7 mb-6 px-2  relative 
                        ${i % 2 ? 'justify-start' : 'justify-end'}
        
                `}>
                            <span className={` ${i % 2 ? 'block' : 'hidden'}  border-t-[.8rem] animate-pulse rotate-[270deg]  mr-[-0.1px]  transform border-l-[.8rem] self-end   border-l-slate-600 border-transparent
                   
                    `}></span>
                            <h1 className={` bg-slate-600   marker: pt-1 pb-2 w-40 animate-pulse h-10 overflow-hidden  px-4 flex items-center text-white rounded 
                           ${i % 2 ? 'rounded-bl-none' : 'rounded-br-none'}
                    `}>

                            </h1>
                            <span className={`  ${i % 2 ? 'hidden' : 'block'}  border-t-[.8rem] animate-pulse border-l-[.8rem] self-end ml-[-0.1px]   border-l-slate-600 border-transparent
                     
                      `}></span>
                        </div>
                    )
                })
            }
        </>
    )
}

export default MessageLoader