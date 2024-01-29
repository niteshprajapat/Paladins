import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
dotenv.config();


const app = express();
const port = 5000;



// DB connection
connectDB();


// Middlewares
app.u




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