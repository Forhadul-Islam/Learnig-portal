import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import Error from "../components/ui/Error";
import Loader from "../components/ui/Loader";
import { useLoginMutation } from "../features/auth/authApi";
import Gradient from "../components/ui/Gradient";

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

      <section className=" py-6 bg-primary  h-screen grid place-items-center">
        <div className="mx-auto shadow-xl bg-slate-900/70 border border-spacing-2 border-gray-700 min-w-[360px] p-5 rounded-lg  max-w-md  lg:px-0">
          <div>
            <img className="h-12 mx-auto" src={logo} />
            {/* <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Sign in to Account
          </h2> */}
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
      </section>
    </>
  );
};

export default Login;
