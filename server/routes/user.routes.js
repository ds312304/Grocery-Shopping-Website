import express from 'express';
import { getProfile, isAuth, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import { authUser } from '../middlewares/authUser.middleware.js';

const userRoute = express.Router();

userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/is-auth', authUser, isAuth)
userRoute.get('/logout', logout)
userRoute.get('/get-profile', authUser, getProfile)
userRoute.post('/update-profile', authUser, updateProfile)

export default userRoute;   