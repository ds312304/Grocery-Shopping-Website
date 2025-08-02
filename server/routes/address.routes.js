import express from 'express'
import { addAddress, deleteAddress, getAddress, updateAddress } from '../controllers/address.controllers.js';
import { authUser } from '../middlewares/authUser.middleware.js';

const addressRoute = express.Router();

addressRoute.post('/add',authUser,addAddress);
addressRoute.get('/get',authUser,getAddress);
addressRoute.put('/update', authUser, updateAddress)
addressRoute.delete('/delete', authUser, deleteAddress)

export default addressRoute