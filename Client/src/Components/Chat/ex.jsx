import React, { useEffect, useRef, useState } from 'react'
import { useConversion } from '../Zustand/useConversation';
import { useServer } from '../../App';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/Context';
import useListenMessage from '../Hooks/useListenMessage';
import { useSocketContext } from '../Context/SocketContext';
import MessageLoader from '../Anim/Message.Loader';

const Chatbox = () => {

    const { selectedConversation, setSelectedConversation } = useConversion();

    return (
        <div className=' relative w-[30rem]  bg-slate-300 h-[70vh] border-l border-slate-400'>
            {
                selectedConversation ?
                    <>
                        <Header selectedConversation={selectedConversation} />
                        <MessageBox />
                        <InputBox />
                    </>
                    :
                    <NoChat />
            }
        </div>
    )
}

export default Chatbox

export const Header = ({ selectedConversation }) => {
    const { OnlineUsers } = useSocketContext()
    const isOnline = OnlineUsers.includes(selectedConversation._id);
    const { setUserUrl, userUrl } = useConversion();

    return (
        <div className=' py-3 bg-slate-100 flex items-center pl-4'>
            <img onClick={() => setUserUrl(selectedConversation?.image)} src={selectedConversation?.image} alt='' className=' h-10 w-10 cursor-pointer bg-slate-500 rounded-full mr-4' />
            <div>
                <h1>{selectedConversation?.fullname}</h1>
                <h1 className={`${isOnline ? 'block' : 'hidden'}`}>online</h1>
            </div>
        </div>
    )
}

export const MessageBox = () => {
    const lastMessageRef = useRef();
    const [loader, setloader] = useState(false);
    const { selectedConversation, messages, setMessages } = useConversion();
    const Server = useServer();
    const { user } = useAuthContext();
    useListenMessage();
    const [dateMessage, setdateMessage] = useState()

    const GetMessage = async () => {
        if (!user?.token) return
        try {
            setloader(true);
            const res = await axios.get(`${Server}/message/get/${user?.token}?receiverId=${selectedConversation._id}`)
            const { error, message, data } = res.data;
            if (error) {
                return toast.error(message)
            } else if (data) {
                setMessages(data.messages)
                const newMsg = (await groupMessagesByDate(data.messages))
                setdateMessage(newMsg)
            }
        } catch (error) {
            return toast.error('Failed to send message')
        }
        finally {
            setloader(false);
        }
    }

    useEffect(() => {
        GetMessage();

        return (
            setMessages('')
        )
    }, [selectedConversation])

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef?.current?.scrollIntoView({ behavior: 'smooth' })
        }, 1);
    }, [messages])


    let t = dateMessage && Object?.keys(dateMessage).map((item) => {
        console.log(dateMessage[item])

    })




    function groupMessagesByDate(messages) {
        const grouped = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize for comparison

        messages.forEach(msg => {
            const msgDate = new Date(msg.createdAt);
            const dateLabel = getDateLabel(msgDate, today);

            if (!grouped[dateLabel]) {
                grouped[dateLabel] = [];
            }

            grouped[dateLabel].push({
                time: msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                message: msg.message,
                senderId: msg.senderId,
                receiverId: msg.receiverId
            });
        });

        return grouped;
    }
    function getDateLabel(date, today) {
        const msgDay = new Date(date);
        msgDay.setHours(0, 0, 0, 0);

        const diffTime = today - msgDay;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";

        return date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: today.getFullYear() !== date.getFullYear() ? "numeric" : undefined
        });
    }

    return (
        <div className=' overflow-y-scroll h-[52vh] scrollbar'>
            {
                loader ? <MessageLoader />
                    :

                    !messages ?
                        <p className=' text-center py-2 text-slate-800'>
                            Send a message to start Converstaion
                        </p> :
                        messages?.map((item, i) => {
                            const { message, receiverId, senderId, createdAt } = item;
                            const Time = new Date(createdAt).toLocaleString();
                            const reciever = selectedConversation._id == receiverId;
                            const shake = message?.shouldShake ? 'shake' : ''
                            return (
                                <div key={i} ref={lastMessageRef} className={` flex  mt-7 mb-6 px-2  relative
                            ${reciever ? ' justify-end' : 'justify-start'}
                            ${reciever ? shake : ''}
                            `}>
                                    <span className={`  border-t-[.8rem] rotate-[270deg] -mr-1 transform border-l-[.8rem] self-end   border-l-slate-600 border-transparent
                                ${reciever ? 'hidden' : 'block'}
                                `}></span>
                                    <h1 className={`  pt-1 pb-2 max-w-80 overflow-hidden h-fit px-4 flex items-center text-white rounded
                                   ${reciever ? 'bg-blue-800' : 'bg-slate-600'}
                                `}>
                                        <span>
                                            {message}
                                        </span>
                                    </h1>
                                    <span className={`  border-t-[.8rem] border-l-[.8rem] self-end -ml-1  border-l-blue-800 border-transparent
                                  ${!reciever ? 'hidden' : 'block'}
                                  `}></span>
                                    <span className=' absolute -bottom-[18px]   text-xs'>
                                        {createdAt ? Time : 'Sending..'}
                                    </span>
                                </div>
                            )
                        })

            }
        </div>
    )
}

export const InputBox = () => {
    const [loader, setloader] = useState(false);
    const [InputMessage, setInputMessage] = useState('')
    const { selectedConversation, messages, setMessages } = useConversion();
    const Server = useServer();
    const { user } = useAuthContext();

    const SendMessage = async (e) => {
        e.preventDefault();
        if (!InputMessage) return
        if (!user?.token) return
        try {
            setloader(true);
            const newMsg = {
                message: InputMessage,
                receiverId: selectedConversation._id,
                senderId: user?.user?.id
            }

            setMessages([...messages, newMsg])
            const res = await axios.post(`${Server}/message/send/${user?.token}?receiverId=${selectedConversation._id}`, { message: InputMessage })
            const { error, message, data } = res.data;
            if (error) {
                toast.error(message)
            } else {
                setMessages([...messages, data])
            }
        } catch (error) {
            return toast.error('Failed to send message')
        }
        finally {
            setloader(false);
        }
        setInputMessage('')
    }

    return (
        <div className=' absolute bottom-0 w-full p-3 border-t border-slate-400 '>
            <form className="flex items-center " onSubmit={SendMessage}>
                <div className="relative w-full">
                    <input value={InputMessage} onChange={(e) => setInputMessage(e.target.value)} type="text" className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full   outline-none p-2  " placeholder="Write a message..." />
                </div>
                <button disabled={!InputMessage} type="submit" className="p-2  ms-2 text-sm font-medium text-white  rounded-lg  bg-slate-200 hover:bg-slate-100    focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <span className={`${!InputMessage ? 'text-gray-500' : 'text-blue-500'}  `}>
                        <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                            width="1.3rem" height="1.3rem" viewBox="0 0 52 52" enableBackground="new 0 0 52 52" xmlSpace="preserve">
                            <path d="M2.1,44.5l4.4-16.3h18.6c0.5,0,1-0.5,1-1v-2c0-0.5-0.5-1-1-1H6.5l-4.3-16l0,0C2.1,8,2,7.7,2,7.4
                            C2,6.7,2.7,6,3.5,6.1c0.2,0,0.3,0.1,0.5,0.1l0,0l0,0l0,0l45,18.5c0.6,0.2,1,0.8,1,1.4s-0.4,1.1-0.9,1.3l0,0L4,46.4l0,0
                            c-0.2,0.1-0.4,0.1-0.6,0.1C2.6,46.4,2,45.8,2,45C2,44.8,2,44.7,2.1,44.5L2.1,44.5z"/>
                        </svg>
                    </span>
                </button>
            </form>
        </div>
    )
}

export const NoChat = () => {
    const { user } = useAuthContext();
    return (
        <div className=' flex justify-center items-center h-full'>
            <div>
                <h1>
                    Hii 👋,
                    <span className=' font-semibold pl-1'>
                        {user?.user?.fullname}
                    </span>
                </h1>
                <h1>
                    Select a chat and start messaging
                </h1>
            </div>
        </div>
    )
}