import React, { Suspense, lazy } from 'react'

const MainBanner = lazy(() => import('../Components/MainBanner'))
const Categories = lazy(() => import('../Components/Categories'))
const BestSeller = lazy(() => import('../Components/BestSeller'))
const BottomBanner = lazy(() => import('../Components/BottomBanner'))
const NewsLetter = lazy(() => import('../Components/NewsLetter'))

const Home = () => {
  return (
    <div className='mt-10'>
      <Suspense fallback={<div className='text-center text-green-600'>Loading homepage...</div>}>
        <MainBanner />
        <Categories />
        <BestSeller />
        <BottomBanner />
        <NewsLetter />
      </Suspense>
    </div>
  )
}

export default Home;