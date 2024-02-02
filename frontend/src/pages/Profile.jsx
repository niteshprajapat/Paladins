import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';


const Profile = () => {
    const { currentUser } = useSelector((store) => store.user);
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='w-full h-screen bg-black/[0.99] p-20'>
            <div className='w-[30%] mx-auto mt-8 text-white'>

                <h1 className='text-center text-white text-3xl  mb-5'>User Profile</h1>

                <form className='flex flex-col gap-6 mt-5'>
                    <div className='self-center'>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            ref={fileRef} type="file" hidden accept='image/*'
                        />

                        <img
                            onClick={() => fileRef.current.click()}
                            className='w-[70px] h-[70px] rounded-full object-cover'
                            src={currentUser?.rest?.profilePicture}
                            alt="profilepicture"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            defaultValue={currentUser?.user?.username}
                            type="text"
                            placeholder='username'
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>

                    <div>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            defaultValue={currentUser?.user?.email}
                            type="email"
                            placeholder='email'
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>

                    <div>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='password'
                            className='w-[95%] py-[7px] px-4 text-sm text-white placeholder:text-white/65 placeholder:text-xs bg-[#111] rounded border border-[#111]  focus:outline-none'
                        />
                    </div>

                    <div className='mt-5'>
                        <button className='w-[95%]  border border-gray-900 bg-gradient-to-r from-[#111]  via-[#161616] to-[#111]  text-white/65 hover:text-white/80 py-[7px] px-4 text-[13px]  rounded-md hover:opacity-90'>Update Details</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile