import React, { useContext, useState } from "react";
import loginicon from "../assets/signin.gif";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    emailOrNumber: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const {fetchUserDetails, fetchCartProductsCount} = useContext(Context)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!data.emailOrNumber || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const dataResponse = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const dataApi = await dataResponse.json();
  
      if (dataApi.success) {
        toast.success("Login successful!");
        navigate("/")
        fetchUserDetails()
        fetchCartProductsCount()
        
      } else {
        toast.error(dataApi.message || "An error occurred."); // Directly use the server's message
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  
    setIsLoading(false);
  };
  
  return (
    <section id="login">
      <div className="mx-auto mt-6 container p-4">
        <div className="bg-slate-100 p-5 w-full max-w-sm mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img src={loginicon} alt="logIn" />
          </div>

          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="">
              <label>Email or Phone :</label>
              <div className="bg-slate-200 p-2 rounded-md">
                <input
                  type="text"
                  placeholder="Enter your Email or Phone"
                  name="emailOrNumber"
                  value={data.emailOrNumber}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
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
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaRegEye /> : <FaRegEyeSlash />}</span>
                </div>
              </div>
            </div>

            <button
              className="bg-Orange1 hover:bg-Orange2 text-white px-6 py-2 w-full max-w-[110px] rounded-full mx-auto block mt-6 hover:scale-110 transition-all"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "LogIn"}
            </button>
          </form>

          <div className="w-full text-sm flex justify-between mt-6">
            <div>
              <Link to="/forgot-password" className="hover:underline hover:text-Orange2">
                Forgot Password?
              </Link>
            </div>
            <div>
              <p>
                Don't have an account?
                <Link to="/sign-up" className="text-Orange1 hover:underline hover:text-Orange2">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
