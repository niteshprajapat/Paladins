import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'Paladins',
        });
        console.log('MongoDb is connected successfully.');
    } catch (error) {
        console.log('MongoDb is not connected.');
        console.log(error);
        process.exit(1);
    }
};

export default connectDB;