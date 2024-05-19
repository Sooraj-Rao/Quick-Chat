import { Link } from "react-router-dom"
import { Button, Loader } from "../Home"
import { useState } from "react"
import { useServer } from "../../App";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../Context/Context";

const Login = () => {
    const [load, setload] = useState(false);
    const Server = useServer();
    const { setCookie, setUser } = useAuthContext();

    const [Input, setInput] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value })
    }

    const Validate = (e) => {
        e.preventDefault()
        if (!Input.username || !Input.password) {
            return toast.error('All Fileds Mandatory')
        }
        if (Input.username.length < 6) {
            return toast.error('Username is too short')
        }
        if (Input.password.length < 6) {
            return toast.error('Password is too short')
        }
        Register();
    }

    const Register = async () => {
        try {
            setload(true);
            const res = await axios.post(`${Server}/auth/login`, Input);
            setload(false);
            const { error, message, token, user } = res.data;
            if (error) {
                return toast.error(message)
            } else {
                toast.success(message)
            }
            setCookie('jwt', token)
            setCookie('user', user)
        } catch (error) {
            setload(false);
            return toast.error('Login Failed')
        }
    }
    return (
        <div className=" bg-cover  h-[calc(100vh-4rem)] bg-no-repeat bg-[url('https://media.istockphoto.com/id/954768386/vector/cartoon-oval-discuss-speech-bubbles-and-bang-bam-clouds-with-hal.jpg?s=612x612&w=0&k=20&c=fay08TwSz2jy6gXj8SdKPoy8Jd8dmAktc1OPT1SP3vs=')]">
            <div className=" w-full h-full bg-slate-300/50  flex items-center">
                <div className="w-full max-w-sm mx-auto overflow-hidden bg-slate-200 rounded-lg shadow-md ">
                    <div className="px-6 py-7 text-white text-center">
                        <p className="mt-1 text-center text-gray-500 ">Login to your account</p>
                        <form onSubmit={Validate}>
                            <div className="w-full mt-4">
                                <input value={Input.username} onChange={handleChange} name="username" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="User Name" aria-label="User Name" />
                            </div>
                            <div className="w-full mt-4">
                                <input value={Input.password} onChange={handleChange} name="password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                            </div>
                            <div className="flex items-center justify-center  mt-4 px-2">
                                <Button text={'Login'} load={load} />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
                        <span className="text-sm text-gray-600 ">Don't have an account? </span>
                        <Link to={'/auth/signup'} className="mx-2 text-sm  text-blue-500 hover:underline">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login