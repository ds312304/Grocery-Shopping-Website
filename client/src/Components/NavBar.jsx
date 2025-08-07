import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../Context/AppContext.jsx'
import toast from 'react-hot-toast'
import { CircleUserIcon } from 'lucide-react'

const NavBar = () => {

    const [open, setOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios, setCartItems } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                setUser(null);
                setCartItems({});
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
        }
    }, [searchQuery])

    return (
        <nav className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">

            <NavLink to='/' onClick={() => setOpen(false)} className="hidden sm:block">
                <img className="h-10 w-auto scale-400" src={assets.logo1} alt="logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8 justify-between flex-1 max-w-5xl mx-auto px-4">
                <div className="hidden lg:flex items-center text-md border border-gray-300 px-4 py-1 flex-1 max-w-xl mx-auto rounded">
                    <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }}
                        className="py-2 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className='w-4 h-4' src={assets.search_icon} alt='search-icon' />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img className='w-8 opacity-80' src={assets.trolley} alt='cart' />
                    <button className="absolute -top-1 -right-2 text-xs text-white bg-red-600 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                {
                    !user ?
                        (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                            Login
                        </button>) : (
                            <div className='relative group'>
                                <img className='w-10' src={assets.profile_icon} alt='profile' />
                                <ul className='hidden group-hover:block absolute top-10 right-0  bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                                    <li onClick={() => navigate('/my-profile')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Profile</li>
                                    <li onClick={() => navigate('/my-orders')} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                                    <li onClick={() => logout()} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                                </ul>
                            </div>
                        )}

            </div>

            {/* Mobile Menu */}
            <div className="md:hidden w-full px-3 py-2 flex items-center justify-between gap-3 z-30">
                {/* Search bar */}
                <div className="flex items-center flex-1 border border-gray-300 rounded px-3 py-3 mr-1">
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder-gray-500 text-sm"
                        type="text"
                        placeholder="Search"
                    />
                    <img className="w-4 h-4 ml-2" src={assets.search_icon} alt="search-icon" />
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3">
                    {/* Cart */}
                    <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                        <img className="w-7 opacity-80" src={assets.trolley} alt="cart" />
                        <button className="absolute -top-1.5 -right-1.5 text-[10px] text-white bg-primary w-[16px] h-[16px] rounded-full flex items-center justify-center">
                            {getCartCount()}
                        </button>
                    </div>

                    {/* Profile */}
                    <div className='relative group cursor-pointer'>
                        <CircleUserIcon className='w-7 h-7' onClick={() => {
                            if (!user) {
                                setShowUserLogin(true);
                            } else {
                                if (window.innerWidth < 768) {
                                    setShowProfile((prev) => (!prev))
                                }
                            }
                        }
                        } />
                        {user && (
                            <ul className={`absolute top-9 right-0 bg-white shadow border border-gray-200 py-2.5 w-32 rounded-md text-sm z-40 ${showProfile ? 'block md:hidden' : 'hidden md:group-hover:block'} `}>
                                <li onClick={() => { navigate('/my-profile'); setShowProfile(false); }} className="p-2 hover:bg-primary/10 cursor-pointer">My Profile</li>
                                <li onClick={() => { navigate('/my-orders'); setShowProfile(false); }} className="p-2 hover:bg-primary/10 cursor-pointer">My Orders</li>
                                <li onClick={() => { logout(); setShowProfile(false); }} className="p-2 hover:bg-primary/10 cursor-pointer">Logout</li>
                            </ul>
                        )}
                    </div>

                </div>
            </div>
        </nav>

    )
}

export default NavBar