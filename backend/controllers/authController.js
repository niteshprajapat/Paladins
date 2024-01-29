import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


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
            user,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error,
        })
    }
}