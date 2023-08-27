import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0.6 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.05,
      repeatType: "reverse",
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const AnimatePage = ({ children }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className=""
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;
