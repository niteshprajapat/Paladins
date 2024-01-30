import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='bg-black/[0.99] w-full h-screen pt-20'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-[100px] font-semibold bg-gradient-to-r from-rose-700 to-pink-600 text-transparent bg-clip-text'>Paladins</h1>
                <p className='bg-gradient-to-r from-rose-700 to-pink-600'>Guard your privacy and your peace of mind.</p>

                <div>
                    <Link to={"/register"}>Get started</Link>
                </div>
            </div>
        </div>
    )
}

export default Home