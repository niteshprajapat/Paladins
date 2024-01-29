import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';



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

        return res.status(200).json({
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