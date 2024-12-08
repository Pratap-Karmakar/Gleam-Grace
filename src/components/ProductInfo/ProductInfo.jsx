import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import myContext from "../../Context/MyContext";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../Redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState('');

    const { id } = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            setProduct({ ...productTemp.data(), id: productTemp.id });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

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

    useEffect(() => {
        getProductData();
    }, []);

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="relative">
                                    <div className="aspect-w-1 aspect-h-1">
                                        <img
                                            className="object-cover w-72  rounded-lg"
                                            src={product?.productImageUrl}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <div className="mb-6">
                                        <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                            {product?.title}
                                        </h2>
                                        <div className="flex flex-wrap items-center mb-6">
                                            <ul className="flex mb-4 mr-2 lg:mb-0">
                                                {/* Star Rating */}
                                            </ul>
                                        </div>
                                        <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                            <span>₹ {product?.price}</span>
                                        </p>
                                    </div>
                                    <div className="mb-6">
                                        <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                                            Description:
                                        </h2>
                                        <p>{product?.description}</p>
                                    </div>
                                    <div className="flex flex-wrap items-center mb-6">
                                        <div className="flex justify-center w-full">
                                            {cartItems.some((p) => p.id === product.id) ? (
                                                <button
                                                    onClick={() => deleteCart(product)}
                                                    className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold p-2"
                                                >
                                                    Remove from Cart
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => addCart(product)}
                                                    className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold p-2"
                                                >
                                                    Add to Cart
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProductInfo;
