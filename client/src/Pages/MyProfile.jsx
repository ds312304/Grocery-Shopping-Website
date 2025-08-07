import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';
import { FiMoreVertical } from 'react-icons/fi';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const { userData, setUserData, axios, navigate, setSelectedAddress, selectedAddress } = useAppContext();

  const [isEdit, setIsEdit] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [addressDelete, setAddressDelete] = useState(null);

  // changing address to select it from my-profile rather then cart
  const updateUserProfileData = async () => {
    try {
      const { data } = await axios.post('/api/user/update-profile', {
        name: userData.name,
        phone: userData.phone,
        gender: userData.gender,
        dob: userData.dob,
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getUserAddress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get('/api/address/get')
      if (data.success) {
        setAddresses(data.data);
        if (selectedAddress) {
          const updatedAddress = data.data.find(addr => addr._id === selectedAddress._id);
          if (updatedAddress) {
            setSelectedAddress(updatedAddress);
          }
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const editAddress = (address) => {
    setShowMenu(null);
    navigate('/add-address', { state: { address, isEdit: true }, address: selectedAddress });
  }

  const deleteAddress = async (address) => {
    setShowMenu(null);
    setAddressDelete(address);
    setShowConfirmModal(true);
  }

  const confirmDeleteAddress = async () => {
    try {
      const { data } = await axios.delete('/api/address/delete', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: { address_id: addressDelete._id }
      });

      if (data.success) {
        toast.success(data.message);
        setAddresses((prev) => prev.filter((a) => String(a._id) !== String(addressDelete._id)));
      }

      if (selectedAddress && selectedAddress._id === addressDelete._id) {
        setSelectedAddress(null);
      }
      setShowMenu(null)
      setShowConfirmModal(false);
      setAddressDelete(null)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getUserAddress();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu !== null && !event.target.closest('.address-menu')) {
        setShowMenu(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu]);

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setAddressDelete(addresses[0])
    }
  }, [addresses, selectedAddress])


  return userData && (
    <div className="max-w-7xl mx-auto p-6 mt-10">
      <div className="flex flex-col md:flex-row gap-8">

        {/* Left: Profile Info */}
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {isEdit ? (
              <div className="flex-1 max-w-[300px]">
                <input
                  className="text-3xl font-semibold text-gray-800 border-b border-gray-300 focus:outline-none w-full"
                  type="text"
                  value={userData.name}
                  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
            ) : (
              <h1 className="text-3xl font-semibold text-gray-800">{userData.name}</h1>
            )}

            {isEdit ? (
              <button
                onClick={updateUserProfileData}
                className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-500 transition sm:w-auto w-full"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded-full hover:bg-yellow-500 hover:text-white transition"
              >
                Edit
              </button>
            )}
          </div>

          <section>
            <h2 className="text-gray-600 text-md font-medium mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 gap-4 text-gray-700">
              <div>
                <p className="text-md font-medium">Email:</p>
                <p className="text-blue-600">{userData.email}</p>
              </div>
              <div>
                <p className="text-md font-medium">Phone:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 px-3 py-2 rounded-md w-full border focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    type="text"
                    value={userData.phone}
                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                ) : (
                  <p className="text-blue-500">{userData.phone}</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-gray-600 text-md font-medium mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 gap-4 text-gray-700">
              <div>
                <p className="text-sm font-medium">Gender:</p>
                {isEdit ? (
                  <select
                    className="bg-gray-100 px-3 py-2 rounded-md w-full border focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                    value={userData.gender}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-500">{userData.gender}</p>
                )}
              </div>

              <div>
                <p className="text-sm font-medium">Birthday:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 px-3 py-2 rounded-md w-full border focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    type="date"
                    value={userData.dob}
                    onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                  />
                ) : (
                  <p className="text-gray-500">{userData.dob}</p>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right: Manage addresses */}
        <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Addresses</h2>
          {
            addresses.length > 0 ? (
              <>
                {
                  selectedAddress ? (
                    <div className="mb-6 border border-yellow-400 bg-yellow-50 p-4 rounded-md">
                      <h3 className="text-lg font-semibold text-yellow-700 mb-2">Shipping Address</h3>
                      <div className='flex gap-2'>
                        <p className="text-sm text-gray-700">
                          <strong>{selectedAddress.firstName} {selectedAddress.lastName}</strong>
                        </p>
                        <div className='px-2 py-1  bg-yellow-100 w-14 rounded '>
                          <p className="text-sm text-gray-400">
                            <strong>{selectedAddress.addressType}</strong> </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{selectedAddress.street}</p>
                      <p className="text-sm text-gray-600">
                        {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zipCode}
                      </p>
                      <p className="text-sm text-gray-600">{selectedAddress.country}</p>
                      <p className="text-sm text-gray-600">Phone: {selectedAddress.phone}</p>
                      {selectedAddress.label && (
                        <span className="inline-block mt-2 text-xs bg-blue-100 text-yellow-600 px-2 py-1 rounded">
                          {selectedAddress.label}
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="mb-6 text-gray-500 italic">{setSelectedAddress(addresses[0])}</p>
                  )
                }
                <div className="space-y-4">
                  {/* Add Address Button */}
                  <button onClick={() => navigate('/add-address')} className="w-full border border-primary text-primary py-2 rounded hover:bg-primary-dull hover:text-white transition">
                    + Add New Address
                  </button>

                  <div className="grid gap-4 max-h-[300px] overflow-y-auto pr-2">
                    {addresses.length > 0 ? (
                      addresses.map((address, index) => (
                        <div key={index} onClick={() => {
                          setSelectedAddress(address);
                        }} className="relative p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition">
                          <div className="absolute top-2 right-2">
                            <FiMoreVertical
                              className="text-gray-500 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowMenu(showMenu === index ? null : index)
                              }}
                            />
                            {showMenu === index && (
                              <div className={`address-menu absolute right-0 mt-2 w-28 bg-white border border-gray-200 shadow-lg rounded-md  ${showMenu === index ? 'opacity-100' : 'opacity-0'}  transition-opacity z-10`}>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    editAddress(address)
                                  }
                                  }
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteAddress(address);
                                  }}
                                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                          <div className='px-2 py-1 bg-gray-100 w-14 rounded mb-1'>
                            <p className="text-sm text-gray-400 font-normal">
                              <strong>{address.addressType}</strong> </p>
                          </div>

                          <p className="text-sm text-gray-700">
                            <strong>{address.firstName} {address.lastName}</strong>
                          </p>
                          <p className="text-sm text-gray-600">{address.street}</p>
                          <p className="text-sm text-gray-600">
                            {address.city}, {address.state} - {address.zipCode}
                          </p>

                          <p className="text-sm text-gray-600">{address.country}</p>
                          <p className="text-sm text-gray-600">Phone: {address.phone}</p>

                          {address.label && (
                            <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                              {address.label}
                            </span>
                          )}
                        </div>
                      ))
                    ) : <div></div>}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 text-center py-10">
                <img className="w-16 h-16 object-contain" src={assets.add_address_iamge} alt="No address" />

                <p className="font-semibold text-xl text-gray-800">No address found in your account!</p>
                <p className="text-gray-600">Please add a shipping address to continue.</p>

                <button
                  onClick={() => navigate('/add-address')}
                  className="mt-2 px-6 py-2 bg-yellow-500 text-white rounded-full"
                >
                  + Add Address
                </button>
              </div>
            )
          }


          {showConfirmModal && (
            <div className="fixed inset-0 bg-white/20 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center border border-gray-300">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Remove address?</h2>
                <p className="text-sm text-gray-600 mb-6">Are you sure you want to remove this address?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDeleteAddress()}
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

