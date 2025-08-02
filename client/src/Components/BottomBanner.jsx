import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='hidden md:block relative mt-24'>
        <img className='w-full hidden md:block rounded-2xl'src={assets.bottom_banner_image} alt='botton-banner'/>
        <img className='w-full md:hidden' src={assets.bottom_banner_image_sm} alt='bottom-banner'/>

        <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24'>
            <div>
                <h1 className='text-2xl md:text-3xl font-semibold text-green-900 mb-6'>Why We Are The Best?</h1>
                {features.map((feature, index) =>(
                    <div key={index} className='flex items-center gap-4 mt-2'>
                        <img className='w-9 md:w-11 rounded-lg ' src={feature.icon} alt={feature.title}/>
                        <div>
                        <h3 className='text-lg md:text-xl font-semibold text-green-950'>{feature.title}</h3>
                        <p className='text-green-900 text-xs md:text-sm'>{feature.description}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BottomBanner