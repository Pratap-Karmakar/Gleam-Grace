import React from 'react';
import { FaHeadset, FaLock, FaMoneyBillWave, FaShippingFast, FaTag } from 'react-icons/fa';

const InfoSection = () => {
    const infoItems = [
        {
            icon: <FaShippingFast className='text-4xl text-red-600' />,
            title: "Free Shipping",
            description: 'Get your orders delivered with no extra cost',
        },
        {
            icon: <FaHeadset className='text-4xl text-red-600' />,
            title: "Support 24/7",
            description: 'We are here to assist you anytime',
        },
        {
            icon: <FaMoneyBillWave className='text-4xl text-red-600' />,
            title: '100% Money Back',
            description: 'Full refund if you are not satisfied',
        },
        {
            icon: <FaLock className='text-4xl text-red-600' />,
            title: "Payment Secure",
            description: 'Your payment is secure',
        },
        {
            icon: <FaTag className='text-4xl text-red-600' />,
            title: "Best Discount",
            description: "Enjoy the best price on your products",
        }
    ];

    return (
        <div className='bg-white py-12'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4'>
                {infoItems.map((item, index) => (
                    <div key={index} className='flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-white'>
                        <div className='w-16 h-16 flex items-center justify-center mb-4'>
                            {item.icon}
                        </div>
                        <h3 className='text-lg md:text-xl font-semibold text-gray-800'>{item.title}</h3>
                        <p className='mt-2 text-sm md:text-base text-gray-600'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InfoSection;
