import React from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast';
import { assets } from '../../assets/assets';

const ProductList = () => {

    const { products, currency, axios, fetchProducts } = useAppContext();

    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('api/product/stock', { id, inStock })
            if (data.success) {
                fetchProducts();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const toggleBestSeller = async (id, bestSeller) => {
        try {
            const { data } = await axios.post('api/product/best-seller', { id, bestSeller });
            if (data.success) {
                fetchProducts();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`/api/product/remove/${id}`)
            if (data.success) {
                fetchProducts();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Failed To delete Product")
        }
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full px-2 md:px-10 py-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className='overflow-x-auto'></div>
                <div className="flex flex-col items-center max-w-7xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold md:truncate">Product</th>
                                <th className="px-4 py-3 font-semibold md:truncate">Category</th>
                                <th className="px-4 py-3 font-semibold md:truncate hidden md:table-cell">Sub-Category</th>
                                <th className="px-4 py-3 font-semibold md:truncate hidden md:table-cell ">Selling Price</th>
                                <th className="px-4 py-3 font-semibold md:truncate">In Stock</th>
                                <th className="px-4 py-3 font-semibold md:truncate">Best Seller</th>
                                <th className="md:px-4 md:py-3 px-2 font-semibold md:truncate min-w-[80px] whitespace-nowrap">Remove</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products.map((product) => (
                                <tr key={product._id} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-300 rounded p-2">
                                            <img src={product.image[0]} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 hidden md:block">{product.subCategory}</td>
                                    <td className="px-4 py-3 max-sm:hidden">{currency}{product.offerPrice}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input onClick={() => toggleStock(product._id, !product.inStock)} checked={product.inStock} type="checkbox" className="sr-only peer" />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input
                                                onClick={() => toggleBestSeller(product._id, !product.bestSeller)}
                                                checked={product.bestSeller}
                                                type="checkbox"
                                                className="sr-only peer"
                                            />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-yellow-500 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <img onClick={() => handleDelete(product._id)} className='w-5 h-5 cursor-pointer hover:scale-110 transition-transform' src={assets.remove_icon} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList