import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/learningportal.svg";

const Register = () => {
  return (
    <section className="py-6 bg-primary h-screen grid place-items-center">
      <div className="mx-auto max-w-md px-5 lg:px-0">
        <div>
          <img className="h-12 mx-auto" src={logo} />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-100">
            Create Your New Account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autocomplete="name"
                required
                className="login-input rounded-t-md"
                placeholder="Student Name"
              />
            </div>
            <div>
              <label for="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                className="login-input "
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                className="login-input"
                placeholder="Password"
              />
            </div>
            <div>
              <label for="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autocomplete="confirm-password"
                required
                className="login-input rounded-b-md"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
            >
              Create Account
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
    </section>
  );
};

export default Register;
