import Sidebar from './Sidebar'
import Chatbox from './Chatbox'
import toast from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import { useAuthContext } from '../Context/Context'
import ViewDp from './ViewDp'
import { useConversion } from '../Zustand/useConversation'

const Main = () => {
    const { setUserUrl, userUrl } = useConversion();
    return (
        <>{
            userUrl ?
                <ViewDp /> : null
        }
            <Topbar />
            <div className=' flex justify-center items-center h-[calc(100vh-14rem)]'>
                <Sidebar />
                <Chatbox />
            </div>
        </>
    )
}

export default Main



export const Topbar = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const { user } = useAuthContext()
    const { setUserUrl, userUrl } = useConversion();

    const handleLogout = async () => {
        try {
            setCookie('user', '')
            setCookie('jwt', '');
            window.location.href = '/'
        } catch (error) {
            toast.error('Logout Failed')
        }
    }

    return (
        <div className=' flex justify-center '>
            <div className=' h-20 bg-blue-100 border-b border-slate-500 w-[51rem] flex justify-between px-10 items-center '>
                <div className=' flex gap-x-5'>
                    <img onClick={() => setUserUrl(user?.user?.image)} src={user?.user?.image} className=' bg-slate-500 cursor-pointer hover:scale-105   rounded-full h-7 w-7' alt="" />
                    <h1>{user?.user?.fullname}</h1>
                </div>
                <div onClick={handleLogout}>
                    <Logout />
                </div>
            </div>
        </div>
    )
}

export const Logout = () => {
    return (
        <div className=' text-sm    flex p-2 cursor-pointer rounded-md hover:bg-slate-100 hover:duration-200 duration-200 mb-2 gap-x-3 borders shadow-inner shadow-slate-500 border-slate-400 items-center  '>
            <span>
                Logout
            </span>
            <h1>
                <svg width="1.2rem" height="1.2rem" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5" stroke="#000000" />
                </svg>
            </h1>
        </div>
    )
}
