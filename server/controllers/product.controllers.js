import { v2 as cloudinary } from 'cloudinary'
import Product from '../models/product.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from '../utils/ApiError.js'

//Add Product: /api/product/add
export const addProduct = async (req, res) => {
    try{
        let productData = JSON.parse(req.body.productData)
        const images  = req.files
        let imagesUrl = await Promise.all(
            images.map(async (item)=> {
            let result = await cloudinary.uploader.upload(item.path, { resource_type:'image'});
            return result.secure_url
        } ))

        await Product.create({
            ...productData, image: imagesUrl
        })
        res.json(new ApiResponse(200, {}, "Product added successfully"))

        }catch(error){
        console.log(error.message)
        return res.json(new ApiError(500, error.message))
    }
}

//Product List: /api/product/list
export const productList = async (req, res) => {
    try{
        const products = await Product.find({})
        res.json(new ApiResponse(200, products))
    }catch(error){
        console.log(error.message)
        return res.json(new ApiError(500, error.message))
    }
}

//Product by id: /api/product/id    
export const productById = async (req, res) => {
    try{
        const { id } = req.body
        const product = await Product.findById(id)
        if(!product){
            return res.json(new ApiError(404, "Product not found"))
        }
        return res.json(new ApiResponse(200,product))
    }catch(error){
        console.log(error.message)
        return res.json(new ApiError(500, error.message))
    }
}

//change product in stock: /api/product/stock
export const changeStock = async (req, res) => {
    try{
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, { inStock: inStock }, { new: true })
        return res.json(new ApiResponse(200, [], "Stock Updated"))
    }catch(error){
        
        console.log(error.message)
        return res.json(new ApiError(500, error.message))
    }
}

//remove product : /api/product/remove/:id
export const removeProduct = async (req,res) => {
    try{
        await Product.findByIdAndDelete(req.params.id)
        return res.json(new ApiResponse(200,[],"Product Deleted"))
    }catch(error){
        console.log(error.message)
        return res.json(new ApiError(500, error.message))
    }
}

//show search results: /api/product/search
export const searchProduct = async (req, res) => {
    const { q } = req.query;
    const regex = new RegExp(q, 'i'); // 'i' for case-insensitive search
    const products = await Product.find({name: regex});
    return res.json(new ApiResponse(200,products))
}

//Best Seller Products: /api/product/best-seller
export const bestSeller = async (req, res) => {
    const {id, bestSeller} = req.body;
    try{
        const products = await Product.findByIdAndUpdate(id,{ bestSeller }, {new:true});
        res.json(new ApiResponse(200, products, "Best Seller Product Updated"))
    }catch(error){
        return res.json(new ApiError(500, error.message))
    }
}