import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://e7.pngegg.com/pngimages/773/168/png-clipart-pokemon-pikachu-illustration-pokemon-go-pokemon-yellow-pikachu-ash-ketchum-pikachu-mammal-vertebrate-thumbnail.png",
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;