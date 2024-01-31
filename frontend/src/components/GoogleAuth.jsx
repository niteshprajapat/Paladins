import React from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/userSlice';


const GoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const response = await axios.post("http://localhost:5000/api/v1/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            const data = await response.data;
            console.log(data);

            dispatch(registerUser(data));
            navigate('/');

        } catch (error) {
            console.log("Could not login with google")
        }

    }


    return (
        <button
            onClick={handleGoogleAuth}
            type='button'
            className='w-[95%] mx-auto  bg-red-700  text-white  py-[7px] px-4 text-[13px]  rounded-md hover:opacity-90'
        >
            Continue with Google
        </button>
    )
}

export default GoogleAuth;