import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Gradient from "../components/ui/Gradient";
import CodeBox from "../components/home/CodeBox";
import { motion } from "framer-motion";

const Home = () => {
  // For now I don't have any landing page.. But in futeure I will create one.. So I am just redirecting to login for now
  return (
    <>
      <Gradient />
      <Navbar />
      <div className="mx-10 mt-16 min-h-screen">
        <main className=" grid grid-cols-7">
          <section className="w-full col-span-4 my-auto flex items-start  flex-col">
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
          </section>
          <section className="col-span-3 mt-5  text-black">
            <motion.div
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
            </motion.div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
