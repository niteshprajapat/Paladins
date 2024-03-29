import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GoogleAuth from '../components/GoogleAuth';



const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('https://paladins-hry5.onrender.com/api/v1/auth/register', {
                username,
                email,
                password,

            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            const data = await response.data;
            console.log(data);

            toast.success(data?.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.log(error?.response?.data?.message);
            toast.error(error?.response?.data?.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <div className='flex justify-between items-center w-full h-screen bg-black/95'>
            <div className='max-w-[70%] w-[30%] text-center mx-auto flex flex-col gap-5 py-10 px-10 -mt-30 rounded-md bg-black text-white'>
                <h1 className='text-[18px] text-yellow-300'>New to Paladins</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-5'>
                    <div>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder='Enter your Username'
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>

                    <div>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Enter your Email '
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>

                    <div>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter your Password '
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>

                    <div className='mt-5'>
                        <button className='w-[95%]  border border-gray-900 bg-gradient-to-r from-[#111]  via-[#161616] to-[#111]  text-white/65 hover:text-white/80 py-[7px] px-4 text-[13px]  rounded-md hover:opacity-90'>Register Now</button>
                    </div>

                    <span className='border border-gray-50/5 w-[95%] mx-auto'></span>

                    <GoogleAuth />


                </form>

                <div className='mt-5 flex justify-center items-center gap-2'>
                    <span className='text-xs text-white/50'>Already have an account? </span>
                    <Link to={"/login"} className='text-xs text-white/60 hover:text-white/70 hover:underline'>login now</Link>
                </div>
            </div>
        </div>
    )
}

export default Register