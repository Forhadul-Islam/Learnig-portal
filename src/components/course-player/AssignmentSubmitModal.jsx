import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubmitAssignmentMutation } from "../../features/assignment-mark/assignmentMarkApi";
import Error from "../ui/Error";
import { motion, AnimatePresence } from "framer-motion";

//motion animation
const dropIn = {
  hidden: {
    scale: 0,
    opacity: 0.7,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 100,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const AssignmentSubmitModal = ({
  open,
  setIsmodalOpen,
  assignment,
  videoId,
}) => {
  const [repoLink, setRepoLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const { user } = useSelector((state) => state.auth) || {};
  const [submitAssignment, { isLoading, isSuccess, isError, error }] =
    useSubmitAssignmentMutation();

  useEffect(() => {
    if (isSuccess) setIsmodalOpen(false);
  }, [isSuccess]);

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    const data = {
      assignment_id: assignment?.id,
      title: assignment?.title,
      student_name: user?.name,
      student_id: user?.id,
      totalMark: 100,
      mark: 0,
      repo_link: repoLink,
      live_link: liveLink,
      status: "pending",
    };
    submitAssignment(data);
  };

  return (
    open && (
      <div className="absolute">
        <div
          onClick={() => setIsmodalOpen(false)}
          className="fixed w-full h-full inset-0 z-10 bg-black/60 cursor-pointer"
        ></div>
        <AnimatePresence initial={true} mode="wait">
          <motion.div
            key="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className=" fixed bg-form-gradient bg-white rounded w-[400px] lg:w-[600px] space-y-8  p-10 z-20 top-[25%] left-[25%]"
          >
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Submit Your Assignment
            </h2>
            <form onSubmit={handleSubmitAssignment} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="repo_link" className="text-black font-bold ">
                    GitHub Link
                  </label>
                  <input
                    id="repo_link"
                    name="repo_link"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Your gitpub repo link"
                    value={repoLink}
                    onChange={(e) => setRepoLink(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <label htmlFor="to" className="text-black font-bold">
                    Live Link
                  </label>
                  <input
                    id="liveLink"
                    name="liveLink"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                    placeholder="Live site link"
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting.." : "Submit Assignment"}
                </button>
              </div>

              {isError && error?.data && <Error message={error?.data} />}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    )
  );
};

export default AssignmentSubmitModal;
