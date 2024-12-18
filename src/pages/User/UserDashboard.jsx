import { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import myContext from "../../Context/MyContext";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router";

const UserDashboard = () => {
  // user data from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  const navigate = useNavigate();

  // context to get the orders placed by the user
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-5 lg:py-8">
        {/* Top Section */}
        <div className="top">
          {/* User Info */}
          <div className="bg-pink-50 py-5 rounded-xl border border-pink-100">
            {/* Profile Picture */}
            <div className="flex justify-center">
              <img
                src={
                  user?.photoURL ||
                  "https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                }
                alt="User Profile"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
            {/* User Details */}
            <div className="text-center">
              <h1 className="text-lg">
                <span className="font-bold">Name: </span> {user?.name}
              </h1>
              <h1 className="text-lg">
                <span className="font-bold">Email: </span> {user?.email}
              </h1>
              <h1 className="text-lg">
                <span className="font-bold">Date: </span> {user?.date}
              </h1>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom">
          {/* Order Details */}
          <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>

            <div className="flex justify-center relative top-4">
              {loading && <Loader />}
            </div>

            {/* Order List */}
            {getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => (
                <div key={index}>
                  {order.cartItems.map((item, index) => {
                    const {
                      id,
                      date,
                      quantity,
                      price,
                      title,
                      productImageUrl,
                      category,
                    } = item;
                    return (
                      <div
                        key={index}
                        className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
                      >
                        {/* Order Summary */}
                        <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                          <div className="p-8">
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                              <div className="mb-4">
                                <div className="text-sm font-semibold text-black">
                                  Order Id
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  #{id}
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-sm font-semibold">
                                  Date
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  {date}
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-sm font-semibold">
                                  Total Amount
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                  ₹ {price * quantity}
                                </div>
                              </div>

                              <div className="mb-4">
                                <div className="text-sm font-semibold">
                                  Order Status
                                </div>
                                <div className="text-sm font-medium text-green-800 first-letter:uppercase">
                                  {order.status}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="flex-1">
                          <div className="p-8">
                            <ul className="-my-7 divide-y divide-gray-200">
                              <li className="flex flex-col justify-between space-x-5 py-7 md:flex-row">
                                <div className="flex flex-1 items-stretch">
                                  <div className="flex-shrink-0">
                                    <img
                                      onClick={() => {
                                        console.log("all product", id); // Log the product id
                                        navigate(`/productinfo/${id}`); // Navigate to the product info page
                                      }}
                                      className="h-20 w-20 rounded-lg border border-gray-200 object-contain hover:cursor-pointer"
                                      src={productImageUrl}
                                      alt="Product"
                                    />
                                  </div>

                                  <div className="ml-5 flex flex-col justify-between">
                                    <div className="flex-1">
                                      <p className="text-sm font-bold text-gray-900">
                                        {title}
                                      </p>
                                      <p className="mt-1.5 text-sm font-medium text-gray-500">
                                        {category}
                                      </p>
                                    </div>

                                    <p className="mt-4 text-sm font-medium text-gray-500">
                                      x {quantity}
                                    </p>
                                  </div>
                                </div>

                                <div className="ml-auto flex flex-col items-end justify-between">
                                  <p className="text-right text-sm font-bold text-gray-900">
                                    ₹ {price}
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
