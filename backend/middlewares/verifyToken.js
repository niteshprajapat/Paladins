import jwt from 'jsonwebtoken';


export const verifyUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(404).json({
            success: false,
            message: 'You need to login first.',
        });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Invalid Token',
        });
    }


    req.user = user;
    next();

}