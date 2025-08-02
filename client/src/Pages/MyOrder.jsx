import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Context/AppContext';

const MyOrder = () => {
    const [myOrders, setMyOrders] = useState([]);
    const { currency, axios, user } = useAppContext();

    const fetchMyOrders = async () => {
        try {
            const { data } = await axios.get('/api/order/user');
            if (data.success) {
                setMyOrders(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchMyOrders();
        }
    }, [user]);

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>

            {myOrders.map((order, index) => (
                <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                        <span>Order Id: {order._id}</span>
                        <span>Payment: {order.paymentType}</span>
                        <span>Total Amount: {currency}{order.amount}</span>
                    </p>

                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white text-gray-500/70 ${
                                order.items.length !== index + 1 ? 'border-b' : ''
                            } border-gray-300 p-4 py-5 w-full`}
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                                {/* Image + Name */}
                                <div className="flex items-start gap-4 md:w-1/2">
                                    <img
                                        src={item.product.image[0]}
                                        alt={item.product.name}
                                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                                    />
                                    <p className="text-lg font-medium text-gray-800 break-words">
                                        {item.product.name}
                                    </p>
                                </div>

                                {/* Quantity / Status / Date */}
                                <div className="md:w-1/4">
                                    <p>Quantity: {item.quantity || 1}</p>
                                    <p>Status: {order.status}</p>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>

                                {/* Amount */}
                                <div className="md:w-1/4 text-primary text-lg font-medium text-left md:text-right">
                                    Amount: {currency}
                                    {item.product.offerPrice * item.quantity}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyOrder;
