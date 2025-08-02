import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"

const authUser = (req, res, next) => {
    const { token } = req.cookies
    if(!token){
        return res.json(new ApiError(401, "Unauthorized"))
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(decode.id){
            req.user = { _id: decode.id }
            next();
        }else{
            return res.json(new ApiError(401, "Unauthorized"))
        }
    }catch(error){
        return res.json(new ApiError(401, error.message))
    } 
}

export { authUser }