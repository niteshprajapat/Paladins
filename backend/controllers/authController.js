import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


/* API Controllers */

// Register
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User already Exist.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            username,
            email,
            password: hashedPassword,
        });


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return res.status(200).cookie('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10 * 60 * 1000),
        }).json({
            success: true,
            message: "User Registered successfully.",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
}


// Login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Please register first.",
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Credentials',
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const { password: hashedPassword, ...rest } = user._doc;

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 10 * 60 * 1000),
        }).json({
            success: true,
            message: 'User loggedIn successfully.',
            user: rest,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
}


// Google
export const google = async (req, res) => {
    try {
        const { name, email, photo } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

            const { password: hashedPassword, ...rest } = user._doc;

            return res.status(200).cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 2 * 60 * 1000)
            }).json({
                success: true,
                message: "loggedIn with Google",
                user: rest,
            });

        } else {

            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(generatePassword, 10);

            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-8),
                email: email,
                password: hashedPassword,
                profilePicture: photo,
            });

            await newUser.save();

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: securePassword, ...rest } = newUser._doc;

            return res.status(200).cookie("token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 2 * 60 * 1000)
            }).json({
                success: true,
                message: "registered with Google",
                user: rest,
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
}


// Signout
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', '', {
            httpOnly: true,
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: 'User loggedOut successfully.',
        })

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        })
    }
}
