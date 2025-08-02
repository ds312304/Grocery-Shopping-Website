import { React } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../Context/AppContext';

const ProductCard = ({ product }) => {
    const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

    const isInStock = product?.inStock === true; // Explicit check for boolean true

    const handleClick = () => {
        if (isInStock) {
            navigate(`/products/${product.category}/${product.subCategory}/${product._id}`);
            scrollTo(0, 0);
        }
    };

    return product && (
        <div 
            onClick={handleClick}
            className={`border border-gray-500/20 rounded-md md:px-4 px-2 py-3 bg-white w-full md:w-[200px] h-full flex flex-col justify-between ${!isInStock ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
            <div className="group flex items-center justify-center">
                <img 
                    className={`transition rounded-md ${isInStock ? 'group-hover:scale-105' : ''} max-w-26 md:max-w-44`} 
                    src={product.image[0]} 
                    alt={product.name} 
                />
            </div>

            <div className="text-gray-500/60 text-sm">
                <p className="text-gray-800 font-semibold text-md mt-2 break-words max-w-full w-full">
                    {product.name}
                </p>
                <p className="text-gray-500/60 md:text-xs text-xs">
                    {product.description}
                </p>

                <div className="flex items-end justify-between mt-2">
                    <div className="md:text-xs text-xs font-bold text-gray-800">
                        {currency}{product.offerPrice}
                        <div className="text-gray-500/60 md:text-xs text-xs line-through">
                            {currency}{product.price}
                        </div>
                    </div>

                    <div onClick={(e) => e.stopPropagation()} className="text-primary">
                        {!isInStock ? (
                            <div className="text-red-600 text-sm font-semibold">
                                Out of Stock
                            </div>
                        ) : !cartItems[product._id] ? (
                            <button 
                                className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer" 
                                onClick={() => addToCart(product._id)}
                            >
                                <img src={assets.cart_icon} alt='add' />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full">-</button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full">+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;


