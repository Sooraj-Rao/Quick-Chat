import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useServer } from '../../App';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../Context/Context';
import { useConversion } from '../Zustand/useConversation';
import { useSocketContext } from '../Context/SocketContext';

const Sidebar = () => {
    const Server = useServer();

    return (
        <div className=' w-[21rem] bg-slate-200 h-[70vh] p-2 relative'>
            <SearchBar />
            <Chats />

        </div>
    )
}

export default Sidebar;

export const SearchBar = () => {
    const [SearchInput, setSearchInput] = useState('');
    const { setSelectedConversation, userList } = useConversion();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!SearchInput) return
        const res = userList.find((user) => (user.fullname.toLowerCase().includes(SearchInput.toLowerCase())))
        if (res) {
            setSelectedConversation(res);
            setSearchInput('')
        } else {
            toast.error('No user found')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center pb-5 border-b">
                <div className="relative w-full">
                    <input value={SearchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full   outline-none p-2  " placeholder='Search..' />
                </div>
                <button disabled={!SearchInput} type="submit" className="p-2.5 disabled:bg-blue-500 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </button>
            </form>

        </div>
    )
}

export const Chats = () => {
    const Server = useServer();
    const { user } = useAuthContext();
    const { setUserUrl, userUrl, selectedConversation, setSelectedConversation, userList, setUserList } = useConversion();
    const { OnlineUsers } = useSocketContext();

    const FetchUsers = async () => {
        try {
            if (!user?.token) {
                return
            }
            const res = await axios.get(`${Server}/user/${user?.token}`);
            const { data, error, message } = res.data;
            if (error) {
                return toast.error(message)
            } else {
                setUserList(data)
            }
        } catch (error) {
            toast.error('Failed to fetch users')
        }
    }
    useEffect(() => {
        userList.length == 0 ? user && FetchUsers() : null
    }, [user])


    return (
        <div className=' h-[60vh] overflow-y-scroll scrollbarHide'>
            {
                userList?.map((item, i) => {
                    const isOnline = OnlineUsers.includes(item._id);
                    return (
                        <div key={i}>
                            <div className={`flex  cursor-pointer gap-2.5 border-b rounded border-gray-300 p-2
                            ${item?._id === selectedConversation?._id ? 'bg-slate-400/40' : 'hover:bg-slate-300/50'}
                            `}
                            >   <div className=' relative'>
                                    <img onClick={() => setUserUrl(item?.image)} className=" w-11 h-10 rounded-full bg-slate-500" src={item?.image} alt="" />
                                    <span className={` absolute h-3 w-3 rounded-full bg-green-600 top-0 -right-1
                                    ${isOnline ? 'block' : 'hidden'}
                                    `}></span>
                                </div>
                                <div className="flex flex-col w-full max-w-[320px] "
                                    onClick={() => (selectedConversation?._id !== item?._id && setSelectedConversation(item))}
                                >
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse relative">
                                        <span className="text-sm font-semibold text-gray-900 ">{item?.fullname}</span>
                                        {/* <span className="text-sm font-normal text-gray-500 absolute right-0 ">11:46</span> */}
                                    </div>
                                    <p className="text-sm font-normal text-gray-800 py-1 ">Write a Message</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )
}

