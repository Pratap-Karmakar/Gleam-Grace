import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to category URL
      navigate(`/category/${searchTerm.trim().toLowerCase()}`);
    } else {
      alert('Please enter a category name');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center flex-1 max-w-xs sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your wish here!"
            className="h-10 md:h-12 lg:h-12 w-full px-4 text-black text-sm md:text-base outline-none border-[1px] border-transparent focus-visible:border-pink-400 transition-all duration-300"
            style={{ borderRadius: '8px' }}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 w-12 md:w-14 lg:w-14 h-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-700 hover:bg-gradient-to-r hover:from-pink-600 hover:to-pink-800 text-white text-lg md:text-xl focus:outline-none transition-colors duration-300"
            style={{ borderRadius: '8px' }}
          >
            <CiSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
