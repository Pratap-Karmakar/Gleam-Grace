import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import myContext from "../../Context/MyContext";
import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import { addToCart, deleteFromCart } from "../../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Category from "../../components/category/Category";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Removed from cart");
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>
            <Category/>
            <div className="py-8">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="text-2xl font-semibold">All Products</h1>
                </div>

                {/* Main */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {getAllProduct.map((item, index) => {
                                const { id, title, price, productImageUrl } = item;
                                return (
                                    <div key={index} className="border border-gray-300 rounded-xl shadow-md overflow-hidden cursor-pointer">
                                        <div
                                            onClick={() => navigate(`/productinfo/${id}`)}
                                            className="relative group"
                                        >
                                            <img
                                                className="h-[40vw] w-full object-cover sm:h-[30vw] md:h-[20vw] lg:h-[15vw] transition-all group-hover:opacity-90"
                                                src={productImageUrl}
                                                alt="Product"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                            Gleam & Grace
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                {title.substring(0, 25)}
                                            </h1>
                                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                ₹{price}
                                            </h1>

                                            <div className="flex justify-center">
                                                {cartItems.some((p) => p.id === item.id) ? (
                                                    <button
                                                        onClick={() => deleteCart(item)}
                                                        className="bg-red-700 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold"
                                                    >
                                                        Remove from Cart
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => addCart(item)}
                                                        className="bg-pink-500 hover:bg-pink-600 w-full text-white py-2 rounded-lg font-bold"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
