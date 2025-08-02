import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout } from '../controllers/seller.controllers.js';
import authSeller from '../middlewares/authAdmin.middleware.js';

const sellerRoute = express.Router();

sellerRoute.post('/login', sellerLogin);
sellerRoute.get('/is-auth', authSeller, isSellerAuth);
sellerRoute.get('/logout', authSeller, sellerLogout);

export default sellerRoute;