/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from "../../components/Loader/Loader";
import myContext from "../../Context/MyContext";
import Layout from "../../components/Layout/Layout";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  /**========================================================================
   *                          User Login Function 
   *========================================================================**/

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: ""
          });
          toast.success("Login Successfully");
          setLoading(false);
          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Login Failed");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        {/* Login Form */}
        <div className="login_Form bg-pink-50 px-6 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12 border border-pink-100 rounded-xl shadow-md w-full max-w-sm md:max-w-md lg:max-w-lg relative">
          
          {/* Close button */}
          <button
            onClick={() => navigate("/")} // Navigate to home or any other route
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
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-pink-500">
              Login
            </h2>
          </div>

          {/* Input One */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  email: e.target.value
                });
              }}
              className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none placeholder-pink-200 text-sm md:text-base lg:text-lg"
            />
          </div>

          {/* Input Two */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin,
                  password: e.target.value
                });
              }}
              className="bg-pink-50 border border-pink-200 px-3 py-2 w-full rounded-md outline-none placeholder-pink-200 text-sm md:text-base lg:text-lg"
            />
          </div>

          {/* Login Button */}
          <div className="mb-5">
            <button
              type="button"
              onClick={userLoginFunction}
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md text-sm md:text-base lg:text-lg"
            >
              Login
            </button>
          </div>

          <div>
            <h2 className="text-black text-sm md:text-base lg:text-lg">
              Don't Have an account?{" "}
              <Link className="text-pink-500 font-bold" to={"/signup"}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
