import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();


const app = express();
const port = 5000;



// DB connection
connectDB();


// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);




// Home Page API
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "This is Home page of Paladins!",
    });
})



// App Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})