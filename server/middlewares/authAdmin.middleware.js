import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

const authSeller = async (req, res,next) => {
    const { sellerToken } = req.cookies;
    if(!sellerToken){
        return next(new ApiError(401, 'Unauthorized'));
    }

    try{
        const decode = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(decode.email === process.env.SELLER_EMAIL){
            next();
        }else{
            return next(new ApiError(401, 'Unauthorized'));
        }

    }catch(error){
        console.log(error.message);
        return next(new ApiError(401, error.message))
    }
}

export default authSeller;