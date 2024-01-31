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


