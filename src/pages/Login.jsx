import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import Error from "../components/ui/Error";
import Loader from "../components/ui/Loader";
import { useLoginMutation } from "../features/auth/authApi";
import Gradient from "../components/ui/Gradient";
import { motion } from "framer-motion";
import AnimatePage from "../components/ui/animation/AnimatePage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading, isError, isSuccess, error }] = useLoginMutation();

  useEffect(() => {
    if (isError) {
      setErrorMessage(error?.data);
    }
    if (isSuccess) navigate(from);
  }, [isError, isSuccess]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) login({ email, password });
  };

  return (
    <>
      <Gradient />

      {/* <section className=" py-6 bg-primary  h-screen grid place-items-center">
        <div className="mx-auto shadow-xl bg-slate-900/70 border border-spacing-2 border-gray-700 min-w-[360px] p-5 rounded-lg  max-w-md  lg:px-0">
          <div>
            <img className="h-12 mx-auto" src={logo} />
            <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
              Sign in to Account
            </h2>
          </div>
          <div>
            <form
              onSubmit={(e) => handleLogin(e)}
              className="mt-8 px-12 space-y-6"
            >
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="login-input h-12 mb-2 rounded-t-md"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="login-input  h-12 rounded-b-md"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <button className="font-medium text-indigo-700 hover:text-indigo-500">
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  {isLoading ? <Loader /> : "Sign In"}
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 justify-start">
              <div className="text-sm ml-5">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-medium ml-2 text-violet-600 hover:text-violet-500"
                >
                  Create Account
                </Link>
              </div>
            </div>
            {isError && errorMessage && (
              <Error
                handleClose={() => setErrorMessage("")}
                message={errorMessage}
              />
            )}
          </div>
        </div>
      </section> */}

      <AnimatePage>
        <div className="h-screen md:flex">
          <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
            <div>
              <h1 className="text-white font-bold text-4xl ">Start Here,</h1>
              <p className="text-white mt-1">
                The most popular peer to peer lending at CoderBiz
              </p>
              <button
                type="submit"
                className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
              >
                Just Go
              </button>
            </div>
            <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          </div>
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form onSubmit={(e) => handleLogin(e)} className="bg-white">
              <Link to="/" className="flex items-center  mb-7">
                <img src={logo} alt="CoderBiz" className="w-3/5" />
              </Link>

              <div className="flex items-center  border-2 py-2 px-3 text-black rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email-address"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-2 outline-none border-none  text-balck"
                  placeholder="Email address"
                />
              </div>
              <div className="flex items-center text-black border-2 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className=" pl-2 outline-none border-none text-balck"
                  placeholder="Password"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                {isLoading ? <Loader /> : "Log In"}
              </button>
              <span className="text-sm ml-2 text-black hover:text-blue-500 cursor-pointer">
                Forgot Password ?
              </span>
              <div className="text-sm ml-2 text-gray-900  cursor-pointer">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-500 cursor-pointer font-medium underline"
                >
                  Create Account
                </Link>
                {isError && errorMessage && (
                  <Error
                    handleClose={() => setErrorMessage("")}
                    message={errorMessage}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </AnimatePage>
    </>
  );
};

export default Login;
