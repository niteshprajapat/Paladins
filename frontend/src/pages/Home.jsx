import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='bg-black/[0.99] w-full h-screen pt-20'>
            <div className='flex flex-col  justify-center items-center mt-20'>
                <h1 className='tracking-wider text-[150px] font-semibold bg-gradient-to-r from-gray-300 via-gray-100 to-gray-500 text-transparent bg-clip-text'>Paladins</h1>
                <Link to={"/register"} className='p-3  w-[10%]  text-center rounded-[1px] cursor-pointer bg-black/50 border border-gray-100/15  text-white/55 hover:text-white/80 text-sm hover:border-white/15'>
                    Get started
                </Link>
            </div>


        </div>
    )
}

export default Home;