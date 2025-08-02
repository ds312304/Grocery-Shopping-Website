import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


//update cart data: /api/cart/update
const updateCart = async(req, res,next) => {
    try{
        const userId = req.user._id;
        const { cartItems } = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json(new ApiResponse(200, null, "Cart updated successfully"))
    }catch(error){
        return next(new ApiError(500, error.message))
    }
}

export default updateCart