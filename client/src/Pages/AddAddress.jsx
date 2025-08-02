import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'


const InputField = ({ type, placeholder, name, handleChange, address, isTextArea = false }) => {
    const commonClasses = 'w-full px-2 py-2.5 border border-gray-500/70 rounded outline-none text-gray-500 focus:border-primary transition';

    return isTextArea ? (
        <textarea
            className={`${commonClasses} resize-none min-h-[100px]`}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required
        />
    ) : (
        <input
            className={commonClasses}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={address[name]}
            required
        />
    );
};


const AddAddress = () => {
    const location = useLocation();
    const isEdit = location.state?.isEdit || false;
    const existingAddress = location.state?.address || {};
    const { axios, user, navigate } = useAppContext();


    const [address, setAddress] = useState({
        firstName: existingAddress.firstName || '',
        lastName: existingAddress.lastName || '',
        street: existingAddress.street || '',
        city: existingAddress.city || '',
        state: existingAddress.state || '',
        zipCode: existingAddress.zipCode || '',
        country: existingAddress.country || '',
        phone: existingAddress.phone || '',
        addressType: existingAddress.addressType == 'Office' ? 'Office' : 'Home',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {   
                const { data } = await axios.put('/api/address/update', {
                    addressId: existingAddress._id,
                    updatedData: address,
                });

                if (data.success) {
                    toast.success('Address updated successfully');
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post('/api/address/add', address);
                if (data.success) {
                    toast.success('Address added successfully');
                } else {
                    toast.error(data.message);
                }
            }
            navigate('/my-profile');
        } catch (error) {
            const message = error.response?.data?.message || "Unexpected error occurred";
            toast.error(message);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [])

    return (
        <div className='mt-16 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={handleSubmit} className='space-y-3 mt-6 text-sm'>
                            <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='First Name' />
                            <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name' />
                        </div>
                        <InputField
                            handleChange={handleChange}
                            address={address}
                            name="street"
                            placeholder="Address (Area and Street)"
                            isTextArea={true}
                        />

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City' />
                            <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State' />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <InputField handleChange={handleChange} address={address} name='zipCode' type='number' placeholder='Zip code' />
                            <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country' />
                        </div>


                        <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='10-digit mobile number' />

                        <div className="mt-4">
                            <p className="text-md font-light text-gray-400">Address Type</p>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="home"
                                        name="addressType"
                                        value="Home"
                                        checked={address.addressType === 'Home'}
                                        onChange={handleChange}
                                        className="form-radio"
                                        required
                                    />
                                    <label htmlFor="home" className="ml-2 text-sm text-gray-700">Home</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="office"
                                        name="addressType"
                                        value="Office"
                                        checked={address.addressType === 'Office'}
                                        onChange={handleChange}
                                        className="form-radio"
                                        required
                                    />
                                    <label htmlFor="office" className="ml-2 text-sm text-gray-700">Office</label>
                                </div>
                            </div>
                        </div>

                        {
                            isEdit ? (
                                <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save</button>
                            ) : (
                                <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
                            )
                        }
                    </form>

                </div>
                <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt='address-image' />
            </div>
        </div>
    )
}

export default AddAddress