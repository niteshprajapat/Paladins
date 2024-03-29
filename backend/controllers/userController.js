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
        return res.status(404).json({
            success: false,
            message: error.message,
        })
    }
}


// Delete User
export const deleteUser = async (req, res) => {
    try {
        if (req.user.id != req.params.id) {
            return res.status(404).json({
                success: false,
                message: 'You can only delete your own account.',
            })
        }

        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'User account has been deleted successfully.'
        })

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        })
    }
}