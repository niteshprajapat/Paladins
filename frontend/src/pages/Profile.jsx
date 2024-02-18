import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUser, logoutUser, deleteUser } from '../redux/slices/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((store) => store.user);

    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState(undefined);

    const [imagePercentage, setImagePercentage] = useState(0);
    const [imageError, setImageError] = useState(false);


    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image])


    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercentage(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
                    setProfilePicture(downloadUrl)
                )
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.put(`http://localhost:5000/api/v1/user/update/${currentUser?.user?._id}`, {
                username,
                email,
                password,
                profilePicture,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            const data = await response.data;
            console.log('Update -> ', data);

            dispatch(updateUser(data));

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
                navigate('/');
            }, 2000);

        } catch (error) {
            console.log("error while updating user profile");
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


    const handleDeleteAccount = async (e) => {
        try {

            const response = await axios.delete(`http://localhost:5000/api/v1/user/delete/${currentUser?.user?._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            const data = await response.data;
            console.log('delete user -> ', data);

            dispatch(deleteUser());

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
                navigate('/register')
            }, 2000);

        } catch (error) {
            console.log("error while deleting user account.");
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

    const handleSignout = async (e) => {
        try {

            const response = await axios.get('http://localhost:5000/api/v1/auth/logout');
            const data = await response.data;
            console.log(data);

            dispatch(logoutUser());

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
                navigate('/')
            }, 2000);



        } catch (error) {
            console.log("error while logging out user.");
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
        <div className='w-full h-screen bg-black/[0.99] p-20'>
            <div className='w-[30%] mx-auto mt-8 text-white'>

                <h1 className='text-center text-white text-3xl  mb-5'>User Profile</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-5'>
                    <div className='flex  flex-col items-center'>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            ref={fileRef} type="file" hidden accept='image/*'
                        />

                        <img
                            onClick={() => fileRef.current.click()}

                            className='w-[70px] h-[70px] rounded-full object-cover'
                            src={profilePicture || currentUser?.user?.profilePicture}
                            alt="profilepicture"
                        />

                        <p className='text-sm '>
                            {
                                imageError ? (
                                    <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
                                ) : imagePercentage > 0 && imagePercentage < 100 ? (
                                    <span >{`Uploading: ${imagePercentage} %`}</span>
                                ) : imagePercentage === 100 ? (
                                    <span className='text-green-700'>Image uploaded successfully.</span>
                                ) : (
                                    ''
                                )
                            }
                        </p>
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
                        <button className='w-[95%]  border border-gray-900 bg-gradient-to-r from-[#111]  via-[#161616] to-[#111]  text-white/65 hover:text-white/80 py-[7px] px-4 text-[13px]  rounded-md hover:opacity-90'>
                            Update Details
                        </button>
                    </div>
                </form>

                <div className='mt-8 text-sm flex justify-between  w-[95%]'>
                    <button onClick={handleDeleteAccount} type='button' className='p-2 bg-red-700 rounded hover:bg-red-600 transition-all duration-150 ease-linear'>Delete Account</button>
                    <button onClick={handleSignout} type='button' className='p-2 bg-red-700 rounded hover:bg-red-600 transition-all duration-150 ease-linear'>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;