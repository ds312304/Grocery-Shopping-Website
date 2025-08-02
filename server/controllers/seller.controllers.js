import { ApiError } from "../utils/ApiError.js";
import jsw from 'jsonwebtoken'
import { ApiResponse } from "../utils/ApiResponse.js"

//Login: /api/seller/login
export const sellerLogin = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD
        ) {
            const token = jsw.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.cookie('sellerToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            return res.json(new ApiResponse(200, null, "Logged in successfully"))
        }else{
            return next(new ApiError(400, "Invalid Credentials"))
        }
    } catch (error) {
        console.log(error.message)
        return next(new ApiError(500, error.message))
    }
}

//sellerAuth : /api/seller/is-auth
export const isSellerAuth = async (req,res,next) => {
    try{
        return res.json({success: true})
    }catch(error){
        console.log(error.message)
        return next(new ApiError(500, error.message))
    }
}

//seller Logout: /api/seller/logout

export const sellerLogout = async (req,res) => {
    try{
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json(new ApiResponse(200, null, "Logged out successfully"))
    }catch(error){
        console.log(error.message)
        return res.json(new ApiError(500, error.message))
    }
}
    