import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { userLoggedOut } from "../../features/auth/authSlice";
import { motion } from "framer-motion";

const Navbar = ({ admin, student }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(userLoggedOut());
    navigate("/");
  };

  return (
    <nav className="shadow-sm z-10">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/">
          <img className="h-10" src={logo} />
        </Link>

        <div className="flex items-center gap-3">
          <h2 className="font-medium text-black">
            {user?.name && `| ${user?.name} |`}{" "}
          </h2>
          {/* //student part */}
          {student && (
            <div className="flex flex-row gap-2">
              <motion.div>
                <Link to="/admin" className="outline_only_btn">
                  Profile
                </Link>
              </motion.div>
              <Link to="/course-player" className="outline_only_btn">
                Course
              </Link>
            </div>
          )}
          {/* admin part */}
          {admin && (
            <div className="flex flex-row gap-2">
              <motion.div>
                <Link to="/admin" className="outline_only_btn">
                  Dashboard 📊
                </Link>
              </motion.div>
              <Link to="/course-player" className="outline_only_btn">
                Course 🤾‍♂️
              </Link>
            </div>
          )}
          {/* //auth button */}
          <button
            onClick={user?.name ? handleLogout : () => navigate("/login")}
            className="flex gap-2 black_btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            {user?.name ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
