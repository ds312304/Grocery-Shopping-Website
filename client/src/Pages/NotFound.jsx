import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 py-12 bg-white text-gray-800">
            {/* Left - Image */}
            <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                <img
                    src={assets.sadDog}
                    alt="Page Not Found"
                    className="w-52 sm:w-64 md:w-72 lg:w-80 h-auto"
                />
            </div>

            {/* Right - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Oops!</h1>
                <p className="text-base sm:text-lg mb-2">
                    The page you are looking for can’t be found.
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    You might find these links useful:
                </p>
                <div className="flex flex-col space-y-2 items-center md:items-start">
                    <Link to="/" className="text-green-600 hover:underline text-sm sm:text-base">
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
