import express from 'express'
import { authUser } from '../middlewares/authUser.middleware.js'
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/order.controllers.js'
import authSeller from '../middlewares/authAdmin.middleware.js'

const orderRoute = express.Router()

orderRoute.post('/cod', authUser, placeOrderCOD)
orderRoute.get('/user',authUser, getUserOrders)
orderRoute.get('/seller', authSeller, getAllOrders)
orderRoute.post('/stripe', authUser, placeOrderStripe)

export default orderRoute