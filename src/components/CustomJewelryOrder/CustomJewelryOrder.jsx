import React, { useState, useContext } from "react";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import myContext from "../../Context/MyContext";
import Layout from "../Layout/Layout";
import BuyNowModal from "../ByNowModal/ByNowModal";

const categoryList = [
  { name: "Pendent" },
  { name: "Ring" },
  { name: "Earring" },
  { name: "Bracelet" },
];

const CustomJewelryOrder = () => {
  const context = useContext(myContext);
  const { setLoading, getAllProductFunction } = context;

  const [orderDetails, setOrderDetails] = useState({
    category: "",
    imageUrl: null,
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
  });

  const handleOrderSubmit = async () => {
    setLoading(true);
    try {
      await addDoc(collection(fireDB, "customJewelryOrders"), orderDetails);
      toast.success("Custom Jewelry Order placed successfully!");
      getAllProductFunction();
      setOrderDetails({
        category: "",
        imageUrl: null,
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrderDetails({ ...orderDetails, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl lg:max-w-7xl py-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-pink-500 text-center mb-6">
            Customize Your Jewelry
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={orderDetails.category}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, category: e.target.value })
              }
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm md:text-base lg:text-lg"
            >
              <option value="" disabled>
                Select Category
              </option>
              {categoryList.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm md:text-base lg:text-lg"
            />
            {orderDetails.imageUrl && (
              <img
                src={orderDetails.imageUrl}
                alt="Jewelry Preview"
                className="mt-4 w-full h-auto rounded-lg border border-gray-200"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              placeholder="Describe your jewelry"
              value={orderDetails.description}
              onChange={(e) =>
                setOrderDetails({ ...orderDetails, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm md:text-base lg:text-lg"
              rows="4"
            />
          </div>

          <BuyNowModal
            addressInfo={addressInfo}
            setAddressInfo={setAddressInfo}
            buyNowFunction={handleOrderSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CustomJewelryOrder;
