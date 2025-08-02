import express from 'express';
import { authUser } from '../middlewares/authUser.middleware.js';
import updateCart from '../controllers/cart.controller.js';

const cartRoute = express.Router();

cartRoute.post('/update', authUser,updateCart)  

export default cartRoute;