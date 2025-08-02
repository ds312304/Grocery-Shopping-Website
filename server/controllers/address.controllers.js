import Address from "../models/address.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//Add Address: /api/address/add
export const addAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const address = req.body;
    await Address.create({
      ...address, userId,
    })
    return res.json(new ApiResponse(200, null, "Address added"))
  } catch (error) {
    console.log(error.message)
    return next(new ApiError(500, error.message))
  }
}

//get Address: /api/address/get

export const getAddress = async (req, res) => {
  try {
    const userId = req.user._id
    const addresses = await Address.find({ userId })
    res.json(new ApiResponse(200, addresses))
  } catch (error) {
    console.log(error.message)
    return res.json(new ApiError(500, error.message))
  }
}


export const deleteAddress = async (req, res,next) => {
  try {
    const userId = req.user._id;
    const { address_id } = req.body;
    const deletedAddress = await Address.findOneAndDelete({ _id: address_id, userId: userId })
    if(!deletedAddress) {
      return next(new ApiError(404, "Address not found or unauthorized"));
    }
    res.json(new ApiResponse(200, null, "Address Deleted"))
  } catch (error) {
    console.log(error.message)
    return res.json(new ApiError(500, error.message))
  }
}

export const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { addressId, updatedData } = req.body;
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId: userId }, // filter
      { $set: updatedData },            // update
      { new: true }                     // return updated document
    );

    if (!updatedAddress) {
      return res.json(new ApiResponse(404, null, "Address not found"));
    }

    return res.json(new ApiResponse(200, updatedAddress, "Address updated successfully"));
  } catch (error) {
    console.log(error.message);

    return next(new ApiError(500, "Internal Server Error"));
  }
};
