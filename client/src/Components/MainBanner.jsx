import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div className='relative '>
            <img className='w-full hidden md:block rounded-2xl' src={assets.banner_image} alt='banner' />
            <img className='w-full md:hidden' src={assets.main_banner_bg_sm} alt='banner' />

            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-20 lg:pl-24'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center md:text-left text-green-950 max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>Freshness You Can Trust, Savings You Will Love!</h1>

                <div className='flex items-center mt-6 font-medium'>
                    <Link className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull hover:scale-110 transition rounded text-white cursor-pointer' to={'/products/vegetables'}>
                        Shop Now 
                        <img className='md:hidden transition group-focus:translate-x-1' src={assets.white_arrow_icon} alt='arrow' /> </Link>
                </div>
            </div>
        </div>
    )
}

export default MainBanner