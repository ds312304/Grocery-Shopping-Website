import React from 'react'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Footer from './Components/Footer'
import Login from './Components/Login'
import { useAppContext } from './Context/AppContext'
import ProductsCategory from './Pages/ProductsCategory'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import AddAddress from './Pages/AddAddress'
import MyOrder from './Pages/MyOrder'
import SellerLayout from './Pages/seller/SellerLayout'
import AddProduct from './Pages/seller/AddProduct'
import ProductList from './Pages/seller/ProductList'
import Orders from './Pages/seller/Orders'
import Loading from './Components/Loading'
import MyProfile from './Pages/MyProfile'
import SearchResult from './Components/SearchResult'
import NotFound from './Pages/NotFound'
import SellerBanner from './Pages/seller/SellerBanner'


const App = () => {

  const isSellerPath = useLocation().pathname.includes('seller');
  const { showUserLogin, isSeller } = useAppContext()
  return (

    <div className='text-default min-h-screen text-shadow-gray-700 bg-white'>

      {isSellerPath ? null : <NavBar />}
      {showUserLogin ? <Login /> : null}

      <Toaster position="bottom-right"
        toastOptions={{
          style: {
            background: '#d1f7c4',         // soft green background
            color: '#2e7d32',              // dark green text
            border: '1px solid #a5d6a7',   // green border
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            width: 'auto',
            minWidth: '320px',
          },
          success: {
            iconTheme: {
              primary: '#2e7d32', // icon color
              secondary: '#d1f7c4',
            },
          },
        }} />

        
      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path ='/products' element={<AllProducts/>}/> */}
          <Route path='/products/:category/:subCategory?' element={<ProductsCategory />} />
          {/* <Route path = '/products/:category' element={<ProductsCategory/>}/> */}
          <Route path='/products/:category/:subCategory/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrder />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/search' element={<SearchResult />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerBanner />}>
            {
              isSeller && (
                <>
                  <Route index element={<AddProduct />} />
                  <Route path='product-list' element={<ProductList />} />
                  <Route path='orders' element={<Orders />} />

                </>
              )
            }

          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}

    </div>
  )
}

export default App