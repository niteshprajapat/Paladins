import express from 'express';

const app = express();
const port = 5000;

app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "This is Home page of Paladins!",
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})