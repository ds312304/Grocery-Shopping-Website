import express from'express';
import { upload } from '../config/multer.js';
import { addProduct, bestSeller, changeStock, productById, productList, removeProduct, searchProduct } from '../controllers/product.controllers.js';
import authSeller from '../middlewares/authAdmin.middleware.js';

const productRoute = express.Router();

productRoute.post('/add', upload.array(['images']),authSeller,addProduct);
productRoute.get('/list', productList);
productRoute.get('/:id', productById);
productRoute.post('/stock',authSeller, changeStock);
productRoute.post('/best-seller', authSeller, bestSeller)
productRoute.delete('/remove/:id', authSeller, removeProduct)
productRoute.get('/search', searchProduct);

export default productRoute;