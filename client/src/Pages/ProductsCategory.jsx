import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../Components/ProductCard';

const ProductsCategory = () => {
    const { products } = useAppContext();
    const { category, subCategory } = useParams();
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([])

    const searchCategory = categories.find(item => item.path === category);
    const subCategories = searchCategory?.subCategory || [];

    useEffect(() => {
        let allProducts = products

        if (category) {
            allProducts = allProducts.filter(p => p.category === category);
        }
        if (subCategory) {
            allProducts = allProducts.filter(p => p.subCategory === subCategory)
        }
        setFilteredProducts(allProducts);
    }, [products, category, subCategory])

    return (
        <div className="px-1 md:px-4 md:py-4 pt-2">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-2 text-center">
                {searchCategory?.text?.toUpperCase()}
            </h1>

            {/* Full-width box showing subcategory group name */}
            <div className="w-full bg-gray-50 shadow p-3 text-lg font-semibold rounded mb-2">
                {(subCategories.find(item => item.path === subCategory) || subCategories[0])?.name}
            </div>

            {/* Main layout */}
            <div className="flex gap-4 h-[75vh]">
                {/* Left Sidebar: Subcategories */}
                <div className="w-18 md:w-23 overflow-x-hidden overflow-y-auto border-r border-gray-300 pr-2">
                    {subCategories.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/products/${category}/${item.path}`)}
                            className={`flex flex-col items-center p-2 mb-2 cursor-pointer transition text-center rounded relative ${subCategory === item.path ? 'text-green-800 font-semibold' : 'text-gray-800 hover:bg-gray-100'}`}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-15 h-15 object-cover rounded-md mb-1"
                            />
                            <div className="w-full text-center text-xs break-words">
                                {item.name}
                            </div>


                            {/* Green underline if active */}
                            {subCategory === item.path && (
                                <div className="absolute bottom-0 w-14 h-1 bg-green-800 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Right Content: Products */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden pr-2 gap-2">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-xl font-medium text-primary">No products found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsCategory;
