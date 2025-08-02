import React, { useState } from 'react'; // Make sure the path is correct
import { useAppContext } from '../../Context/AppContext';
import { assets } from '../../assets/assets';
import SellerLogin from '../../Components/seller/SellerLogin';

const SellerBanner = () => {
  const [showSellerLogin, setShowSellerLogin] = useState(false);
  const { navigate } = useAppContext();
  return (
    <div className="bg-[#FFD32C] min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-40 py-10">
      {showSellerLogin && (
        <div
          className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center"
          onClick={() => setShowSellerLogin(false)}
        >
          <div
            className="bg-gray-200 shadow-lg p-6 rounded-md w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SellerLogin />
          </div>
        </div>
      )}

      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        {/* Left Side Text and Button */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Your<span className='text-green-800'> Products.</span> <br></br><span className="">De</span><span className='text-green-800'>livered.</span><br />
            In <span className="text-green-800">minutes.</span>
          </h1>
          <p className="text-lg text-gray-800 max-w-xl mx-auto md:mx-0">
            Turn everyday essentials into exceptional experiences — delivered with ease. Begin selling today!
          </p>
          <button className="bg-green-800 text-white text-2xl font-semibold px-6 py-5 rounded-md transition duration-300 cursor-pointer" onClick={() => setShowSellerLogin(true)}>
            Sell on GoCart
          </button>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={assets.delivery_boy}
            alt="Delivery Rider"
            className="w-[90%] md:max-w-[1000px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SellerBanner;