import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Home'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useServer } from '../../App';

const Signup = () => {
    const [load, setload] = useState(false)
    const Server = useServer();
    const [Input, setInput] = useState({
        fullname: '',
        username: '',
        gender: 'male',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...Input, [name]: value })
    }

    const Validate = (e) => {
        e.preventDefault()
        if (!Input.fullname || !Input.username || !Input.password || !Input.confirmPassword) {
            return toast.error('All Fileds Mandatory')
        }
        if (Input.fullname.length < 6 || Input.username.length < 6) {
            return toast.error('Name or Username is too short')
        }
        if (Input.password.length < 6 || Input.confirmPassword.length < 6) {
            return toast.error('Password is too short')
        }
        if (Input.password !== Input.confirmPassword) {
            return toast.error('Password do not match')
        }
        Register();
    }

    const Register = async () => {
        try {
            setload(true);
            const res = await axios.post(`${Server}/auth/signup`, Input);
            setload(false);
            const { error, message } = res.data;
            if (error) {
                return toast.error(message)
            } else {
                toast.success(message)
            }
        } catch (error) {
            setload(false);
            return toast.error('Registartion Failed')
        }
    }


    return (
        <div>
            <div className=" bg-cover  h-[calc(100vh-4rem)] bg-no-repeat bg-[url('https://media.istockphoto.com/id/954768386/vector/cartoon-oval-discuss-speech-bubbles-and-bang-bam-clouds-with-hal.jpg?s=612x612&w=0&k=20&c=fay08TwSz2jy6gXj8SdKPoy8Jd8dmAktc1OPT1SP3vs=')]">
                <div className=" w-full h-full bg-slate-300/50  flex items-center">
                    <div className="w-full max-w-sm mx-auto overflow-hidden bg-slate-200 rounded-lg shadow-md ">
                        <div className="px-6 py-7 text-white text-center">
                            <p className="mt-1 text-center text-lg text-gray-500 ">Create an account now!</p>
                            <form onSubmit={Validate} className=' text-[15px]'>
                                <div className="w-full mt-4">
                                    <input value={Input.fullname} onChange={handleChange} name='fullname' className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Full Name" aria-label="Email Address" />
                                </div>
                                <div className="w-full mt-4">
                                    <input value={Input.username} onChange={handleChange} name='username' className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="User Name" aria-label="Email Address" />
                                </div>

                                <div className="flex flex-wrap mt-4">
                                    <div className="flex items-center me-4">
                                        <input id="red-radio" type="radio" defaultChecked onChange={handleChange} value='male' name='gender' className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 " />
                                        <label className="ms-2 text-sm font-medium text-gray-900 ">Male</label>
                                    </div>
                                    <div className="flex items-center me-4">
                                        <input id="green-radio" type="radio" name='gender' value='female' onChange={handleChange} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300   " />
                                        <label className="ms-2 text-sm font-medium text-gray-900 ">Female</label>
                                    </div>
                                </div>

                                <div className="w-full mt-4">
                                    <input value={Input.password} onChange={handleChange} name='password' className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                                </div>
                                <div className="w-full mt-4">
                                    <input value={Input.confirmPassword} onChange={handleChange} name='confirmPassword' className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Confirm-Password" aria-label="Password" />
                                </div>
                                <div className="flex items-center justify-center mt-4 px-2">
                                    <Button text={'Register'} load={load} />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
                            <span className="text-sm text-gray-600 ">Already have an account? </span>
                            <Link to={'/auth/login'} className="mx-2 text-sm  text-blue-500 hover:underline">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup