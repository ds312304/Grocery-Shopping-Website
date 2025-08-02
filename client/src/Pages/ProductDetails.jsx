import React, { useEffect, useState } from 'react'
import { useAppContext } from '../Context/AppContext'
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';

const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products.find((item) => item._id === id);

    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();
            const related = productCopy.filter((item) => item.category === product.category && item._id !== product._id);
            setRelatedProducts(related.slice(0, 5));
        }
    }, [product])

    useEffect(() => {
        setThumbnail(product?.image[0] ? product?.image[0] : null);
    }, [product])


    return product && (
        <div className="mt-12">
            <p>
                <Link to='/'>Home</Link> /
                <Link to='/products'> Products</Link> /
                <Link to={`/products/${product.category}`}> {product.category}</Link> /
                <Link to={`/product/${product.category}/${product.subCategory}`}>{product.subCategory}</Link>/
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-8 mt-4">
                <div className="flex gap-3">
                    <div className="flex md:flex-col gap-3 max-h-[90px] md:max-h-[500px] overflow-y-auto scrollbar-thin">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className={`p-1 border rounded-md cursor-pointer transition duration-200 hover:scale-105 ${thumbnail === image ? 'border-gray-400-500 ring-2 ring-gray-300' : 'border-gray-300'
                                }`} >
                                <img className="object-cover w-20 h-20 rounded-md" src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden max-w-[600px] max-h-[500px] w-[400px] h-[400px]">
                        <img className="object-cover w-full h-full py-4 px-4" src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">Price: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className=" text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(product._id); navigate('/cart') }} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className='flex flex-col items-center mt-20'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-3xl font-medium'>Related Products</p>
                    <div className='w-20 h-0.5 bg-primary rounded-full mt-2'></div>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6 w-full'>{relatedProducts.filter((product) => product.inStock).map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}</div>
                </div>
                <button onClick={() => { navigate(`/products/${product.category}`); scrollTo(0, 0) }} className='mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition'>See More</button>
            </div>
        </div>
    )
}

export default ProductDetails