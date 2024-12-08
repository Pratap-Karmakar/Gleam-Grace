import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { LuShoppingCart } from "react-icons/lu"; // Import the cart icon
import jlogo from "../../assets/images/jlogo.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // Logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  // CartItems
  const cartItems = useSelector((state) => state.cart);

  const handleSearch = (event) => {
    event.preventDefault();
    if (search.trim() !== "") {
      // Navigate to the correct category URL based on search input
      navigate(`/category/${search.trim().toLowerCase()}`);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Navigation list
  const navList = (
    <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-gray-800 font-medium text-md">
      <li>
        <button
          onClick={() => {
            setIsOpen(false);
            navigate("/");
          }}
          className="text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
        >
          Home
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            setIsOpen(false);
            navigate("/allproduct");
          }}
          className="text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
        >
          All Products
        </button>
      </li>
      <li>
        <button
          onClick={() => {
            if (!user) {
              navigate("/login");
            } else {
              setIsOpen(false);
              navigate("/customjewelryorder");
            }
          }}
          className="text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
        >
          Custom Orders
        </button>
      </li>
      {!user && (
        <>
          <li>
            <Link
              to="/signup"
              className="block text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </li>
        </>
      )}
      {user?.role === "user" && (
        <li>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/user-dashboard");
            }}
            className="text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
          >
            Account
          </button>
        </li>
      )}
      {user?.role === "admin" && (
        <li>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/admin-dashboard");
            }}
            className="text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
          >
            Account
          </button>
        </li>
      )}
      {user && (
        <li>
          <button
            onClick={logout}
            className="text-[#DE4188] hover:text-[#742549] duration-300 px-4 py-2 rounded-md w-full text-left"
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <nav className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 sticky top-0 z-10 shadow-lg px-4 md:px-10">
      <div className="flex justify-between items-center h-16">
        <Link to="/">
          <img
            src={jlogo}
            alt="page logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </Link>

        {/* Cart option and Hamburger Menu for Mobile */}
        <div className="md:hidden flex items-center">
          {/* Cart option first with icon */}
          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                navigate("/cart");
              }
            }}
            className="text-gray-800 hover:text-gray-500 mr-4 relative"
          >
            <LuShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>

          {/* Toggle button after the cart */}
          <button onClick={toggleMenu} className="text-gray-800">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation and Searchbar */}
        <div className="hidden md:flex md:items-center md:space-x-6 flex-1">
          <form
            onSubmit={handleSearch}
            className="flex items-center flex-1 max-w-xs sm:max-w-md md:max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search your wish here!"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 md:h-10 w-full rounded-full px-4 text-black text-sm md:text-base outline-none border-[1px] border-transparent focus-visible:border-pink-400 duration-300 transition-all"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 w-10 h-full rounded-full flex items-center justify-center bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 text-white text-lg md:text-xl focus:outline-none transition-colors duration-300"
              >
                <CiSearch />
              </button>
            </div>
          </form>
          {navList}
          {/* Cart button in desktop view */}
          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                navigate("/cart");
              }
            }}
            className="text-gray-800 hover:text-gray-500 relative"
          >
            <LuShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu without the cart icon */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 p-4 space-y-4">
          <form
            onSubmit={handleSearch}
            className="flex items-center max-w-xs mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search your wish here!"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-full rounded-full px-4 text-black text-sm outline-none border-[1px] border-transparent focus-visible:border-pink-400 duration-300 transition-all"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 w-10 h-full rounded-full flex items-center justify-center bg-gradient-to-r from-red-300 via-pink-300 to-purple-300 hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 text-white text-lg focus:outline-none transition-colors duration-300"
              >
                <CiSearch />
              </button>
            </div>
          </form>
          {navList}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
