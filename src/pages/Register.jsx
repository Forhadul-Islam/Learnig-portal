import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import Error from "../components/ui/Error";
import Loader from "../components/ui/Loader";
import { useRegisterMutation } from "../features/auth/authApi";
import Gradient from "../components/ui/Gradient";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //register mutation
  const [register, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      role: "student",
    };
    register(data);
    if (isSuccess) navigate(from);
  };

  return (
    <>
      <Gradient />
      <section className="py-6 bg-primary h-screen grid place-items-center">
        <div className="mx-auto min-w-[360px] shadow-xl bg-slate-900/70 border border-spacing-2 rounded-lg py-3 border-gray-700 max-w-md px-5 lg:px-0">
          <div>
            <img className="h-12 mx-auto" src={logo} />
            <h2 className="mt-6 text-center text-2xl font-bold text-slate-100">
              Create Your New Account
            </h2>
          </div>
          <div className="px-6">
            <form onSubmit={handleRegister} className="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Name
                  </label>
                  <input
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="name"
                    type="name"
                    autoComplete="name"
                    required
                    className="login-input rounded-t-md"
                    placeholder="Student Name"
                  />
                </div>
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
                    className="login-input "
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
                    className="login-input"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    name="confirm-password"
                    type="password"
                    autoComplete="confirm-password"
                    required
                    className="login-input rounded-b-md"
                    placeholder="Confirm Password"
                  />
                </div>
                {password !== confirmPassword && (
                  <div className="text-red-700 my-2 ml-1">
                    {" "}
                    password not match!{" "}
                  </div>
                )}
              </div>

              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                >
                  {isLoading ? <Loader /> : "Create Account"}
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 justify-start">
              <div className="text-sm">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium ml-2 text-violet-600 hover:text-violet-500"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
        {isError && <Error message={error.data} />}
      </section>
    </>
  );
};

export default Register;
