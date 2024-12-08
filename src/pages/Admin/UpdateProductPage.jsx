import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState, useCallback } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import myContext from "../../Context/MyContext";
import Loader from "../../components/Loader/Loader";
import Layout from "../../components/Layout/Layout";

const categoryList = [
  { name: 'Pendent' },
  { name: 'Ring' },
  { name: 'Earring' },
  { name: 'Bracelet' }
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  // navigate
  const navigate = useNavigate();
  const { id } = useParams();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Get Single Product Function wrapped with useCallback
  const getSingleProductFunction = useCallback(async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImageUrl: product?.productImageUrl,
        category: product?.category,
        description: product?.description,
        quantity: product?.quantity,
        time: product?.time,
        date: product?.date,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [id, setLoading]); // Dependency array includes 'id' and 'setLoading'

  // Update product
  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Product Updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, [getSingleProductFunction]); // Include getSingleProductFunction in the dependency array

  return (
    <Layout>
      <div>
        <div className="flex justify-center items-center h-screen">
          {loading && <Loader />}
          {/* Update Product Form */}
          <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
            {/* Top Heading */}
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-pink-500 ">
                Update Product
              </h2>
            </div>

            {/* Input fields for product details */}
            <div className="mb-3">
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
                placeholder="Product Title"
                className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                placeholder="Product Price"
                className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="productImageUrl"
                value={product.productImageUrl}
                onChange={(e) =>
                  setProduct({ ...product, productImageUrl: e.target.value })
                }
                placeholder="Product Image Url"
                className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <select
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
              >
                <option disabled>Select Product Category</option>
                {categoryList.map((value, index) => {
                  const { name } = value;
                  return (
                    <option
                      className="first-letter:uppercase"
                      key={index}
                      value={name}
                    >
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="mb-3">
              <textarea
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
                name="description"
                placeholder="Product Description"
                rows="3"
                className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300"
              />
            </div>

            {/* Update Product Button */}
            <div className="mb-3">
              <button
                onClick={updateProduct}
                type="button"
                className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProductPage;




// import { useNavigate, useParams } from "react-router";
// import { useContext, useEffect, useState } from "react";
// import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import toast from "react-hot-toast";
// import myContext from "../../Context/MyContext";
// import Loader from "../../components/Loader/Loader";
// import Layout from "../../components/Layout/Layout";

// const categoryList = [
//   {
//     name: 'Pendent'
// },
// {
//     name: 'Ring'
// },
// {
//     name: 'Earring'
// },
// {
//     name: 'Bracelet'
// },
// ]

// const UpdateProductPage = () => {
//     const context = useContext(myContext);
//     const { loading, setLoading, getAllProductFunction } = context;

//     // navigate 
//     const navigate = useNavigate();
//     const { id } = useParams()
//     console.log(id)

//     // product state
//     const [product, setProduct] = useState({
//         title: "",
//         price: "",
//         productImageUrl: "",
//         category: "",
//         description: "",
//         time: Timestamp.now(),
//         date: new Date().toLocaleString(
//             "en-US",
//             {
//                 month: "short",
//                 day: "2-digit",
//                 year: "numeric",
//             }
//         )
//     });

//     // Get Single Product Function
//     const getSingleProductFunction = async () => {
//         setLoading(true);
//         try {
//             const productTemp = await getDoc(doc(fireDB, "products", id))
//             //   console.log(product.data())
//             const product = productTemp.data();
//             setProduct({
//                 title: product?.title,
//                 price: product?.price,
//                 productImageUrl: product?.productImageUrl,
//                 category: product?.category,
//                 description: product?.description,
//                 quantity : product?.quantity,
//                 time: product?.time,
//                 date: product?.date
//             })
//             setLoading(false);

//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     }

//     const updateProduct = async () => {
//         setLoading(true)
//         try {

//             await setDoc(doc(fireDB, 'products', id), product)
//             toast.success("Product Updated successfully")
//             getAllProductFunction();
//             setLoading(false)
//             navigate('/admin-dashboard')

//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         getSingleProductFunction();
//     }, []);
//     return (
//        <Layout>
//          <div>
//             <div className='flex justify-center items-center h-screen'>
//                 {loading && <Loader />}
//                 {/* Login Form  */}
//                 <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

//                     {/* Top Heading  */}
//                     <div className="mb-5">
//                         <h2 className='text-center text-2xl font-bold text-pink-500 '>
//                             Update Product
//                         </h2>
//                     </div>

//                     {/* Input One  */}
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             name="title"
//                             value={product.title}
//                             onChange={(e) => {
//                                 setProduct({
//                                     ...product,
//                                     title: e.target.value
//                                 })
//                             }}
//                             placeholder='Product Title'
//                             className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
//                         />
//                     </div>

//                     {/* Input Two  */}
//                     <div className="mb-3">
//                         <input
//                             type="number"
//                             name="price"
//                             value={product.price}
//                             onChange={(e) => {
//                                 setProduct({
//                                     ...product,
//                                     price: e.target.value
//                                 })
//                             }}
//                             placeholder='Product Price'
//                             className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
//                         />
//                     </div>

//                     {/* Input Three  */}
//                     <div className="mb-3">
//                         <input
//                             type="text"
//                             name="productImageUrl"
//                             value={product.productImageUrl}
//                             onChange={(e) => {
//                                 setProduct({
//                                     ...product,
//                                     productImageUrl: e.target.value
//                                 })
//                             }}
//                             placeholder='Product Image Url'
//                             className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
//                         />
//                     </div>

//                     {/* Input Four  */}
//                     <div className="mb-3">
//                         <select
//                             value={product.category}
//                             onChange={(e) => {
//                                 setProduct({
//                                     ...product,
//                                     category: e.target.value
//                                 })
//                             }}
//                             className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  ">
//                             <option disabled>Select Product Category</option>
//                             {categoryList.map((value, index) => {
//                                 const { name } = value
//                                 return (
//                                     <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
//                                 )
//                             })}
//                         </select>
//                     </div>

//                     {/* Input Five  */}
//                     <div className="mb-3">
//                         <textarea
//                             value={product.description}
//                             onChange={(e) => {
//                                 setProduct({
//                                     ...product,
//                                     description: e.target.value
//                                 })
//                             }} name="description" placeholder="Product Description" rows="3" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

//                         </textarea>
//                     </div>

//                     {/* Update Product Button  */}
//                     <div className="mb-3">
//                         <button
//                             onClick={updateProduct}
//                             type='button'
//                             className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
//                         >
//                             Update Product
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//        </Layout>
//     );
// }

// export default UpdateProductPage;