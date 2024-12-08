import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 py-10">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Jewelry Bazar Quote */}
          <div className="md:col-span-8 flex flex-col justify-center text-center md:text-left">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
              <span className="text-purple-600">Gleam & Grace</span> is the last destination of your jewellery search.
            </h3>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-2 text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 relative inline-block">
              Quick Links
              <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-gradient-to-r from-red-400 via-pink-500 to-purple-500"></span>
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/contactus" 
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/aboutUs" 
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media Links */}
          <div className="md:col-span-2 text-center md:text-left">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-4 relative inline-block">
              Follow Us
              <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-gradient-to-r from-red-400 via-pink-500 to-purple-500"></span>
            </h4>
            <ul className="flex justify-center md:justify-start space-x-6">
              <li>
                <Link 
                  to="#" 
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
                  <FaFacebook size={24} />
                </Link>
              </li>
              <li>
                <Link 
                  to="#" 
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-300">
                  <FaInstagram size={24} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Horizontal Line */}
        <div className="my-8">
          <hr className="border-t-2 border-gradient-to-r from-red-400 via-pink-500 to-purple-500" />
        </div>
        
        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-gray-600">
            &copy; 2024 Gleam & Grace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
