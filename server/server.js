import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import userRoute from './routes/user.routes.js';
import errorHandler from './middlewares/errorHandling.js';
import sellerRoute from './routes/seller.routes.js';
import connectCloudinary from './config/cloudinary.js';
import productRoute from './routes/product.routes.js';
import cartRoute from './routes/cart.routes.js';
import addressRoute from './routes/address.routes.js';
import orderRoute from './routes/order.routes.js';
import { stripeWebhooks } from './controllers/order.controllers.js';

const app = express();
const PORT = process.env.PORT || 4000


//Connecting to MongoDB
connectDB();
await connectCloudinary();

const allowedOrigins = ['http://localhost:5173']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

// Middlewares
app.use(express.json())
app.use(cors({origin:allowedOrigins, credentials:true}))
app.use(cookieParser())



app.get('/',(req,res) => {res.send('Api is Working')})
app.use('/api/user', userRoute)
app.use('/api/seller', sellerRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/address', addressRoute)
app.use('/api/order', orderRoute)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}`
    });
});
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})