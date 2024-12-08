import React from 'react';
import { FaStar, FaHeart } from "react-icons/fa";
import { addToCart } from '../../redux/CartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product));
  };



  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      className="border rounded-lg shadow-lg overflow-hidden bg-white w-full h-full transform transition-transform duration-500 hover:scale-105 hover:cursor-pointer"
      onClick={handleCardClick}
    > 
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 uppercase text-header-color">{product.name}</h3>
        <p className="text-gray-800 mb-2">Rs.{product.price}</p>
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-600" />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div
            onClick={(e) => handleAddToCart(e, product)} 
            className="flex items-center justify-between bg-gray-200 p-2 rounded cursor-pointer hover:bg-gray-300 transition"
          >
            <span className="text-lg font-semibold text-primary-color">+</span>
            <span className="text-lg font-semibold text-primary-color">Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
