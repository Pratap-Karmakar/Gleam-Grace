/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import Layout from "../../components/Layout/Layout";
import myContext from "../../Context/MyContext";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/

    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user");

            // Add User Detail
            await addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Signup Failed");
        }
    };

    return (
        <Layout>
            <div className='flex justify-center items-center h-screen bg-gray-50'>
                {loading && <Loader />}
                {/* Signup Form */}
                <div className="login_Form bg-pink-50 px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12 border border-pink-100 rounded-xl shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg relative">
                    {/* Close button */}
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                    >
                       <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
                    </button>

                    {/* Top Heading */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500'>
                            Signup
                        </h2>
                    </div>

                    {/* Input One */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Full Name'
                            value={userSignup.name}
                            onChange={(e) => {
                                setUserSignup({
                                    ...userSignup,
                                    name: e.target.value
                                });
                            }}
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full md:w-96 rounded-md outline-none placeholder-pink-200'
                        />
                    </div>

                    {/* Input Two */}
                    <div className="mb-3">
                        <input
                            type="email"
                            placeholder='Email Address'
                            value={userSignup.email}
                            onChange={(e) => {
                                setUserSignup({
                                    ...userSignup,
                                    email: e.target.value
                                });
                            }}
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full md:w-96 rounded-md outline-none placeholder-pink-200'
                        />
                    </div>

                    {/* Input Three */}
                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder='Password'
                            value={userSignup.password}
                            onChange={(e) => {
                                setUserSignup({
                                    ...userSignup,
                                    password: e.target.value
                                });
                            }}
                            className='bg-pink-50 border border-pink-200 px-2 py-2 w-full md:w-96 rounded-md outline-none placeholder-pink-200'
                        />
                    </div>

                    {/* Signup Button */}
                    <div className="mb-5">
                        <button
                            type='button'
                            onClick={userSignupFunction}
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md'
                        >
                            Signup
                        </button>
                    </div>

                    <div>
                        <h2 className='text-black'>
                            Have an account? <Link className='text-pink-500 font-bold' to={'/login'}>Login</Link>
                        </h2>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Signup;
