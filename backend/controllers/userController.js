import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';



// Update User
export const updateUser = async (req, res) => {
    try {
        const { username, email, password, profilePicture } = req.body;

        if (req.user.id !== req.params.id) {
            return res.status(401).json({
                success: false,
                message: 'You can only update your own account.',
            })
        }

        if (password) {
            password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: username,
                    email: email,
                    password: password,
                    profilePicture: profilePicture,
                }
            },
            { new: true },
        )

        return res.status(200).json({
            success: true,
            message: 'User updated successfully.',
            updatedUser,
        })

    } catch (error) {

    }
}