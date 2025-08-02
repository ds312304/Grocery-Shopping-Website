import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const { isSeller, setIsSeller, navigate, axios} = useAppContext();
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        try{
            e.preventDefault();
            const { data } = await axios.post('/api/seller/login', {email,password})

            if(data.success){
                setIsSeller(true);
                navigate('/seller')
            }else{
                toast.error(data.message)
            }
        }catch(error){
            const message = error.response?.data?.message || "Unexpected error occurred";
            toast.error(message);
        }
    }

    useEffect(() => {
        if(isSeller){
            navigate("/seller");
        }
    }, [isSeller])

  return !isSeller && (
    <form onSubmit = {onSubmitHandler} className='w-full flex items-center justify-center text-sm text-gray-600' onclick={(e) => e.stopPropagation()}>
        <div className='flex flex-col gap-5 m-auto items-start py-10 min-w-80 sm:min-w-88 rounded-lg'>
            <p className='text-4xl font-bold m-auto text-black'>seller login</p>

            <div className='w-[100%]'>
                <p className=''>Email</p>
                <input value = {email} onChange = {(e) => {setEmail(e.target.value)}} className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' type="email" placeholder='Enter email' required/>
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input value = {password} onChange = {(e) => {setPassword(e.target.value)}} className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' type="password" placeholder='Enter password' required/>
            </div>

            <button className='bg-green-700 text-white w-full py-2 rounded-md cursor-pointer'>Login</button>
        </div>
        
    </form>
  )
}

export default SellerLogin