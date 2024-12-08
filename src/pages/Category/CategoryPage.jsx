import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Loader from '../../components/Loader/Loader';
import myContext from '../../Context/MyContext';
import noItem from '../../assets/images/noitem.jpg';
import pendent from '../../assets/ProductIcons/pendent.png';
import ring from '../../assets/ProductIcons/ring.png';
import earring from '../../assets/ProductIcons/earring.png';
import bracelet from '../../assets/ProductIcons/bracelet.png';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../Redux/cartSlice';
import toast from 'react-hot-toast';

const categoryIcons = {
  pendent,
  ring,
  earring,
  bracelet,
};

const CategoryPage = () => {
  const { categoryname } = useParams();  // Get category name from URL
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Category Name from URL:', categoryname); // Debugging log
    console.log('All Products:', getAllProduct);  // Debugging log
  }, [categoryname, getAllProduct]);

  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.toLowerCase().includes(categoryname.toLowerCase())
  );

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success('Added to cart');
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success('Removed from cart');
  };

  const categoryIcon = categoryIcons[categoryname];

  return (
    <Layout>
      <div className="mt-10">
        <div className="text-center mb-5">
          {categoryIcon && (
            <img src={categoryIcon} alt={categoryname} className="mx-auto w-16 h-16" />
          )}
          <h1 className="text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center">
                {filterProduct.length > 0 ? (
                  filterProduct.map((item, index) => (
                    <div key={index} className="p-4 w-full md:w-1/4">
                      <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                        <img
                          onClick={() => navigate(`/productinfo/${item.id}`)}
                          className="h-[40vw] w-full object-cover sm:h-[30vw] md:h-[20vw] lg:h-[15vw] transition-all group-hover:opacity-90"
                          src={item.productImageUrl}
                          alt={item.title}
                        />
                        <div className="p-6">
                          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          Gleam & Grace
                          </h2>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {item.title.substring(0, 25)}
                          </h1>
                          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            ₹{item.price}
                          </h1>
                          <div className="flex justify-center">
                            {cartItems.some((p) => p.id === item.id) ? (
                              <button
                                onClick={() => deleteCart(item)}
                                className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Delete from Cart
                              </button>
                            ) : (
                              <button
                                onClick={() => addCart(item)}
                                className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <img className="mb-2 mx-auto w-72" src={noItem} alt="No products found" />
                    <h1 className="text-4xl font-semibold text-pink-700">No {categoryname} products found!</h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
