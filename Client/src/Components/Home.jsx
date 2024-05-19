import { Link, useLocation, useNavigate } from "react-router-dom"

const Home = () => {
    const nav = useNavigate()
    return (
        <div>
            <div className={`w-full bg-center bg-cover h-[calc(100vh-4rem)] bg-[url('../../home.jpg')] `}>
                <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
                    <div className="text-center">
                        <h1 style={{ textShadow: '1px 1px 1px blue' }} className="text-3xl  font-semibold  text-white lg:text-7xl">QuickChat: Connect. Chat. Explore.</h1>
                        <div onClick={() => nav('/auth/signup')} className=" flex justify-center mt-10" >
                            <Button text={'Get Started'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

export const Logo = () => {
    return (
        <div className=" flex items-center h-[2rem]">
            <img src="../../logo.png" alt="" className=" rounded mr-1 h-7 w-7 bg-slate-500" />
            <h1 className=" text-slate-400 p-2 text-center text-lg ">
                Quick
                <span className=" text-blue-400">
                    Chat
                </span>
            </h1>
        </div>
    )
}

export const Navbar = () => {
    return (
        <nav className=" bg-slate-100 sticky top-0 shadow flex justify-around items-center py-3">
            <Link to={'/c'}>
                <Logo />
            </Link>

            <footer>
                <h1 className=" text-slate-400 p-2 text-center cursor-default">
                    Developed By
                    <span onClick={() => window.open('https://sooraj-rao.vercel.app/', '_blank')} className="ml-2 text-blue-400 hover:text-blue-500 hover:underline cursor-pointer">
                        Sooraj
                    </span>
                </h1>
            </footer>
        </nav>
    )
}

export const Button = ({ text, load }) => {
    return (
        <>
            <button disabled={load} className="w-full flex justify-center px-5 py-2 text-base font-medium text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-800 focus:outline-none ">
                {
                    load ?
                        <Loader /> :
                        text
                }
            </button>
        </>
    )
}

export const Loader = ({ color }) => {
    return (
        <div className=" px-2 py-[2px] ">
            <div className={` h-5 w-5 border-2 ${color ? ' border-slate-600' : 'border-white'}  border-t-transparent rounded-full animate-spin`}></div>
        </div>
    )
}