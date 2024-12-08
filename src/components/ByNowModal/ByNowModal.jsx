import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/cartSlice";  // Import the clearCart action

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();  // Use Redux dispatch

    const handleOpen = () => setOpen(!open);

    // Function to handle buy and clear the cart
    const handleBuyNow = () => {
        handleOpen();  // Close the modal
        buyNowFunction();  // Execute the provided buyNowFunction
        dispatch(clearCart());  // Clear the cart after purchase is confirmed
    };

    return (
        <>
            {/* Trigger button */}
            <button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
            >
                Buy now
            </button>

            {/* Modal overlay */}
            {open && (
                <div className="fixed p-2 inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    {/* Modal content */}
                    <div className="bg-pink-50 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={handleOpen}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        {/* Heading */}
                        <div className="mb-5">
                            <h2 className='text-center text-2xl font-bold text-pink-500'>
                                Fill the details
                            </h2>
                        </div>

                        <div className="mb-3">
                            <input
                                value={addressInfo.name}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        name: e.target.value
                                    });
                                }}
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                value={addressInfo.address}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        address: e.target.value
                                    });
                                }}
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                value={addressInfo.pincode}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        pincode: e.target.value
                                    });
                                }}
                                type="number"
                                name="pincode"
                                placeholder="Enter your pincode"
                                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                value={addressInfo.mobileNumber}
                                onChange={(e) => {
                                    setAddressInfo({
                                        ...addressInfo,
                                        mobileNumber: e.target.value
                                    });
                                }}
                                type="text"
                                name="mobileNumber"
                                placeholder="Enter your mobile number"
                                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                            />
                        </div>

                        {/* Confirm button */}
                        <div>
                            <button
                                onClick={handleBuyNow}  // Call the new function to handle purchase and clear the cart
                                type="button"
                                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent rounded-lg hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100"
                            >
                                Confirm Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BuyNowModal;
