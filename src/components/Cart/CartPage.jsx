import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../Redux/cartSlice";
import emptyCart from "../../assets/images/emptycart.png";
import BuyNowModal from "../ByNowModal/ByNowModal";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { Navigate, useNavigate } from "react-router";

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((prevValue, currValue) => prevValue + currValue, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Buy Now Function
  const user = JSON.parse(localStorage.getItem("users"));

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const buyNowFunction = () => {
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All Fields are required");
    }

    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    try {
      const orderRef = collection(fireDB, "order");
      addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("Order Placed Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="container flex justify-center w-72 mx-auto max-w-5xl lg:px-0 py-8">
          <img src={emptyCart} alt="empty cart" />
        </div>
        <h1 className="text-center pb-24 font-semibold text-4xl text-pink-700">
          Your cart is empty!
        </h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl lg:max-w-7xl">
        <div className="mx-auto py-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>
          <form className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
            <section aria-labelledby="cart-heading" className="lg:col-span-8">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => {
                  const {
                    id,
                    title,
                    price,
                    productImageUrl,
                    quantity,
                    category,
                  } = item;
                  return (
                    <li
                      key={index}
                      className="flex flex-col sm:flex-row py-6 sm:py-6"
                    >
                      <div className="flex-shrink-0 sm:w-28 sm:h-28">
                        <img
                          onClick={() => {
                            console.log("all product", id); // Log the product id
                            navigate(`/productinfo/${id}`); // Navigate to the product info page
                          }}
                          className="h-24 w-24 sm:h-28 sm:w-28 rounded-md object-contain hover:cursor-pointer"
                          src={productImageUrl}
                          alt="Product"
                        />
                      </div>
                      <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-semibold">{title}</h3>
                          <p className="text-sm font-medium text-gray-900">
                            ₹{price}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{category}</p>
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center">
                            <button
                              type="button" // Add type="button" to prevent form submission
                              onClick={(e) => {
                                e.preventDefault(); // Prevent the default form submission
                                handleDecrement(id);
                              }}
                              className="h-7 w-7 bg-gray-200 rounded"
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={quantity}
                              readOnly
                              className="mx-1 h-7 w-9 text-center rounded border"
                            />
                            <button
                              type="button" // Add type="button" to prevent form submission
                              onClick={(e) => {
                                e.preventDefault(); // Prevent the default form submission
                                handleIncrement(id);
                              }}
                              className="h-7 w-7 bg-gray-200 rounded"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button" // Add type="button" to prevent form submission
                            onClick={(e) => {
                              e.preventDefault(); // Prevent the default form submission
                              deleteCart(item);
                            }}
                            className="ml-4 flex items-center text-red-500"
                          >
                            <Trash size={16} />
                            <span className="ml-1">Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="mt-8 lg:mt-0 lg:col-span-4">
              <div className="bg-white rounded-md p-4 shadow-sm">
                <h2 className="text-lg font-medium border-b pb-4">
                  Price Details
                </h2>
                <dl className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-sm">
                      Price ({cartItemTotal} item{cartItemTotal > 1 ? "s" : ""})
                    </dt>
                    <dd className="text-sm font-medium">₹ {cartTotal}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-sm">Delivery Charges</dt>
                    <dd className="text-sm font-medium text-green-600">Free</dd>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <dt className="text-lg font-medium">Total Amount</dt>
                    <dd className="text-lg font-medium">₹ {cartTotal}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  {user ? (
                    <BuyNowModal
                      addressInfo={addressInfo}
                      setAddressInfo={setAddressInfo}
                      buyNowFunction={buyNowFunction}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )}
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
