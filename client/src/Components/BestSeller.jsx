import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../Context/AppContext'

const BestSeller = () => {

  const { products } = useAppContext()
  
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Most Selling Products</p>
      <div className='flex overflow-x-auto space-x-4 md:space-x-10 no-scrollbar mt-6'>
        {
          products.filter((product) => product.inStock && product.bestSeller).map((product, index) => (
            <div className='min-w-[160px] max-w-[180px] w-full flex-shrink-0' key={index}>
              <ProductCard product={product} />
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default BestSeller