import React from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Gradient from "../components/ui/Gradient";
import CodeBox from "../components/home/CodeBox";
import { motion } from "framer-motion";
import SideAnimation from "../components/home/SideAnimation";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { role } = useAuth();

  return (
    <>
      <Gradient />
      <Navbar admin={role == "admin"} student={role == "student"} />
      <div className="mx-10 mt-16 min-h-screen">
        <main className=" grid md:grid-cols-7">
          <section className="w-full md:col-span-4 my-auto flex md:items-start items-center   flex-col">
            <h1 className="head_text ">
              Learn & Prepare
              <br className="max-md:hidden" />
              <span className="orange_gradient">For the Next Interview</span>
            </h1>
            <p className=" desc ">
              Welcome to our Learning Portal, where programmers elevate their
              skills and excel in interviews. Explore expert-led tutorials,
              tackle coding challenges, and gain the confidence needed to ace
              technical assessments. Unleash your full potential with our
              comprehensive resources and step confidently into your programming
              journey. Your success starts here.
            </p>
            <Link
              to="/course-player"
              className="text-white text-bold  bg-pink-600 ring-2 ring-pink-500 hover:bg-pink-700 transition-all px-4 py-2 mt-5 rounded-full"
            >
              Go to Course
            </Link>
          </section>
          <section className="md:col-span-3 col-span-full mt-25 md:mt-5  text-black">
            {/* <motion.div
              initial={{ scale: 1 }}
              animate={{
                scale: 0.9,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 10,
                transition: { duration: 2 },
              }}
              exit={{ scalse: 0 }}
            >
              <CodeBox />
            </motion.div> */}
            {/* <SideAnimation /> */}
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#FF0066"
                d="M37.2,-48.6C52.8,-39.8,73.3,-35.1,81.5,-23.3C89.7,-11.5,85.6,7.5,75,19.6C64.5,31.6,47.5,36.8,33.9,44.8C20.3,52.7,10.2,63.5,-2.8,67.3C-15.8,71.2,-31.6,68.2,-38.6,58.1C-45.6,48,-43.9,30.9,-49.8,15.5C-55.7,0.2,-69.2,-13.4,-70.3,-26.7C-71.3,-40.1,-59.8,-53.3,-46,-62.6C-32.2,-72,-16.1,-77.6,-2.7,-74C10.8,-70.3,21.5,-57.4,37.2,-48.6Z"
                transform="translate(100 100)"
              />
            </svg>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
