import jwt from "jsonwebtoken";
import { User } from '../models/user.js'
import { CustomError } from '../utils/customError.js'

const isLoggedIn = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return next(new CustomError("Login first to access this page", 400))
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id)
        next();
    } catch (err) {
        res.status(400).json({ message: "unauthorized" });
    }
}

export { isLoggedIn }
