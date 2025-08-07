import React, { Suspense, lazy } from 'react'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './Context/AppContext'

// Lazy-loaded pages
const Home = lazy(() => import('./Pages/Home'))
const Login = lazy(() => import('./Components/Login'))
const ProductsCategory = lazy(() => import('./Pages/ProductsCategory'))
const ProductDetails = lazy(() => import('./Pages/ProductDetails'))
const Cart = lazy(() => import('./Pages/Cart'))
const AddAddress = lazy(() => import('./Pages/AddAddress'))
const MyOrder = lazy(() => import('./Pages/MyOrder'))
const MyProfile = lazy(() => import('./Pages/MyProfile'))
const SearchResult = lazy(() => import('./Components/SearchResult'))
const Loading = lazy(() => import('./Components/Loading'))
const NotFound = lazy(() => import('./Pages/NotFound'))
const SellerLayout = lazy(() => import('./Pages/seller/SellerLayout'))
const AddProduct = lazy(() => import('./Pages/seller/AddProduct'))
const ProductList = lazy(() => import('./Pages/seller/ProductList'))
const Orders = lazy(() => import('./Pages/seller/Orders'))
const SellerBanner = lazy(() => import('./Pages/seller/SellerBanner'))

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className='text-default min-h-screen text-shadow-gray-700 bg-white'>
      {isSellerPath ? null : <NavBar />}
      {showUserLogin && (
        <Suspense fallback={<div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 text-white text-lg">Loading login...</div>}>
          <Login />
        </Suspense>
      )}

      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#d1f7c4',
          color: '#2e7d32',
          border: '1px solid #a5d6a7',
          padding: '12px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          width: 'auto',
          minWidth: '320px',
        },
        success: {
          iconTheme: {
            primary: '#2e7d32',
            secondary: '#d1f7c4',
          },
        },
      }} />

      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Suspense fallback={<div className='text-center py-20 text-green-700'>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:category/:subCategory?' element={<ProductsCategory />} />
            <Route path='/products/:category/:subCategory/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/add-address' element={<AddAddress />} />
            <Route path='/my-orders' element={<MyOrder />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/loader' element={<Loading />} />
            <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerBanner />}>
              {isSeller && (
                <>
                  <Route index element={<AddProduct />} />
                  <Route path='product-list' element={<ProductList />} />
                  <Route path='orders' element={<Orders />} />
                </>
              )}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App;