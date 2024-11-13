import React, { useState } from "react";
import loginicon from "../assets/signin.gif"; 
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import glogo from "../assets/glogo.png";
import summaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPwd, setShowCnfPwd] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [data, setData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    cnfPassword: "",
  });

  const navigatelogin = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/; 

    if (!phoneRegex.test(data.number)) {
      toast.error("Please enter a valid phone number!");
      return;
    }
  
    if (data.password === data.cnfPassword) {
      setLoading(true); 
      try {
        const dataResponse = await fetch(summaryApi.signUp.url, {
          method: summaryApi.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        const dataApi = await dataResponse.json();  
  
        if (!dataResponse.ok) {
          toast.error(dataApi.message || 'Failed to sign up');
          return;
        }
  
        if (dataApi.success) {
          toast.success(dataApi.message);
          setData({ name: "", number: "", email: "", password: "", cnfPassword: "" });
          navigatelogin("/login");
        } else {
          toast.error(dataApi.message);
        }
      } catch (error) {
        console.error("Error during sign-up:", error);
        toast.error(error.message || 'An error occurred during sign up.');
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      toast.error("Passwords do not match!");
    }
  };

  return (
    <section id="login">
      <div className="mx-auto mt-6 container p-4">
        <div className="bg-slate-100 p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img src={loginicon} alt="logIn" />
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="grid">
              <label>Name :</label>
              <div className="bg-slate-200 p-2 rounded-md">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="grid mt-3">
              <label>Email :</label>
              <div className="bg-slate-200 p-2 rounded-md">
                <input
                  type="email"
                  placeholder="Enter your E-mail"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="grid mt-3">
              <label>Number :</label>
              <div className="bg-slate-200 p-2 rounded-md">
                <input
                  type="tel"
                  placeholder="Enter your Phone Number"
                  name="number"
                  value={data.number}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mt-3">
              <label>Password :</label>
              <div className="bg-slate-200 rounded-md p-3 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mt-3">
              <label>Confirm Password :</label>
              <div className="bg-slate-200 rounded-md p-3 flex">
                <input
                  type={showCnfPwd ? "text" : "password"}
                  placeholder="Re-enter your password"
                  name="cnfPassword"
                  value={data.cnfPassword}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowCnfPwd((prev) => !prev)}
                >
                  {showCnfPwd ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            {/* SignUp Button */}
            <button
              className={`bg-Orange1 hover:bg-Orange2 text-white px-6 py-2 w-full max-w-[110px] rounded-full mx-auto block mt-5 hover:scale-110 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Google SignIn and Login Link */}
          <div className="w-full text-sm flex justify-between mt-4">
            <div className="flex flex-col items-center justify-center w-full">
              {/* Sign in with Google */}
              <button className="flex items-center bg-white text-black border border-gray-300 rounded-full px-4 py-2 shadow-md hover:shadow-lg hover:bg-gray-100">
                <img src={glogo} alt="Google Logo" className="w-5 h-5 mr-2" />
                Sign in with Google
              </button>

              {/* Login Link */}
              <div className="mt-3">
                <p>
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="text-Orange1 hover:underline hover:text-Orange2"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
