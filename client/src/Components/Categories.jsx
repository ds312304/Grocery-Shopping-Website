import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../Context/AppContext'

const Categories = () => {

    const { navigate } = useAppContext()

    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Categories</p>
            <div className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 mt-6 gap-6'>

                {categories.map((category, index) => (
                    <div key={index} className='flex flex-col cursor-pointer items-center'
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()}`);
                            window.scrollTo(0, 0)
                        }}>
                        <div className='group rounded-2xl flex justify-center items-center w-full bg-[#EFFFE8]'>

                        <img loading="lazy" className='group-hover:scale-110 transition max-w-28'
                            src={category.image} alt={category.text} />
                        </div>

                        <p className='text-sm font-medium text-center mt-3'>{category.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories