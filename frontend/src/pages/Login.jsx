import React from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className='flex justify-between items-center w-full h-screen bg-black/95'>
            <div className='max-w-[70%] w-[30%] text-center mx-auto flex flex-col gap-5 py-10 px-10 -mt-30 rounded-md bg-black text-white'>
                <h1 className='text-[19px] text-white/80'>Register</h1>

                <form className='flex flex-col gap-6 mt-5'>
                    <div>
                        <input
                            type="text"
                            placeholder='Enter your Name'
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder='Enter your Email '
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder='Enter your Password '
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>

                    <div className='mt-5'>
                        <button className='w-[95%]  border border-gray-900 bg-gradient-to-r from-[#111]  via-[#161616] to-[#111]  text-white/65 hover:text-white/80 py-[7px] px-4 text-[13px]  rounded-md hover:opacity-90'>Register Now</button>
                    </div>
                </form>

                <div className='mt-5 flex justify-center items-center gap-2'>
                    <span className='text-xs text-white/50'>Already have an account? </span>
                    <Link to={"/signin"} className='text-xs text-white/60 hover:text-white/70 hover:underline'>login now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login