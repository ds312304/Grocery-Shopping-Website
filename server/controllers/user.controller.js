import { ApiError } from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


//Regis User: /api/user/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new ApiError(400, "Please provide all the fields")
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            throw new ApiError(400, "User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true, //prevent JS to access cookiee
            secure: process.env.NODE_ENV === 'production', //use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000  //cookie expiration time
        })

        return res.json(
            new ApiResponse(200, {
                email: newUser.email,
                name: newUser.name
            }, "Registered Successfully")
        )
    } catch (error) {
        console.log(error.message)
        throw new ApiError(500, error.message)
    }
}

//Login User:/api/user/login

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ApiError(401, "Please provide all the fields"))
        }

        const user = await User.findOne({ email })
        if (!user) {
            return next(new ApiError(400, "Invalid credentials"))

        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(new ApiError(401, "Invalid credentials"))
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json(
            new ApiResponse(200, {
                user
            }, "Logged in successfully")
        )

    } catch (error) {
        console.log(error.message)
        return next(new ApiError(500, error.message))
    }
}

export const isAuth = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            console.log("Error catch if !user me")
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            user,
            message: "User authenticated successfully"
        });

    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
}

//logut: /api/user/logout
const logout = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })

        return res.json(new ApiResponse(200, null, "Logged out successfully"))
    } catch (error) {
        console.log(error.message)
        return next(new ApiError(500, error.message))
    }
}

export const updateProfile = async(req,res,next) => {
    try{
        const userId = req.user._id;
        const { name, phone, dob, gender } = req.body;

        if(!name || !phone || !dob || !gender){
            return next(new ApiError(400, "Please provide all fields"))
        }
        await User.findByIdAndUpdate(userId, { name, phone, dob, gender})

        return res.json(new ApiResponse(200, null,"Profile Updated"))
    }catch(error){
        console.log(error)
        return next(new ApiError(500, error.message))
    }
}

export const getProfile = async(req,res,next) => {
    try{
        const userId = req.user._id;
        const userData = await User.findById(userId).select('-password')
        return res.json(new ApiResponse(200, userData))
    }catch(error){
        console.log(error.message)
        return next(new ApiError(500, error.message))
    }
}
export { register, login, logout };


