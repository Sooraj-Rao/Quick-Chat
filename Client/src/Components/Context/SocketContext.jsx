import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./Context";
import io from 'socket.io-client'

 const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

// eslint-disable-next-line react/prop-types
const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [OnlineUsers, setOnlineUsers] = useState([]);
    const { user } = useAuthContext();
    const Server = import.meta.env.VITE_SOCKET||'http://localhost:3000';

    useEffect(() => {
        if (user?.user?.id) {
            const socket = io(`${Server}`, {
                query: {
                    userId: user?.user?.id
                }
            })
            setSocket(socket)

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
            })

            return () => { socket.close() }
        } else {
            if (socket) {
                socket.close();
                setSocket(null)
            }
        }
    }, [user])


    return (
        <SocketContext.Provider value={{ socket, OnlineUsers }}>{children}</SocketContext.Provider>
    )
}

export default SocketContextProvider