import React from 'react';
import heroimage from '../../assets/images/heropage.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='bg-white px-4 md:px-16 lg:px-24 mt-2'>
      <div className='container mx-auto py-4'>
        
        {/* Hero Image Section */}
        <div className='w-full relative'>
          <img 
            src={heroimage} 
            alt="Hero" 
            className='w-full h-72 md:h-80 lg:h-96 object-cover rounded-md shadow-lg'
          />
          <div className='absolute inset-0 bg-black bg-opacity-20 rounded-md'></div> {/* Optional Overlay */}
          <div className='absolute inset-0 flex flex-col justify-center items-center md:items-start p-6 md:p-12 text-center md:text-left'>
            <p className='text-xl text-white font-semibold mb-2'>Welcome to Gleam & Grace</p>
            <h2 className='text-3xl md:text-4xl font-bold text-white leading-tight'>Welcome to Your Last Destination for Jewellery</h2>
            <h3 className='text-2xl md:text-3xl text-white mt-2'>Fulfill Your Wish Here</h3>
            <Link to='/allproduct'>
              <button className='mt-6 px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-full shadow hover:bg-red-700 transition duration-300'>
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
