import React from 'react';
import { FaShieldAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




const Header = () => {
    const { currentUser } = useSelector((store) => store.user);

    return (
        <div className=' w-full bg-black text-white fixed z-30 shadow-md p-5'>
            <div className='flex justify-between items-center w-[1200px] mx-auto'>
                <div className=' '>
                    <Link to={"/"} className='flex items-center gap-2'>
                        <FaShieldAlt className='text-[32px] font-bold text-red-700 cursor-pointer' />
                        <span className='text-yellow-300 text-[20px] cursor-pointer'>Paladins</span>
                    </Link>
                </div>
                <div className='flex items-center gap-10'>
                    <Link to={"/"}>Home</Link>
                    {/* <Link to={"/register"}>Register</Link>
                    <Link to={"/login"}>Login</Link> */}

                    <Link to={"/profile"}>
                        {
                            currentUser ? (
                                <img className='w-9 h-9 rounded-full object-cover' src={currentUser?.user?.profilePicture || currentUser?.rest?.profilePicture} alt="profilepicture" />
                            ) : (
                                <p>Login</p>
                            )
                        }
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header