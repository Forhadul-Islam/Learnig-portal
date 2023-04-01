import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubmitAssignmentMutation } from "../../features/assignment-mark/assignmentMarkApi";
import Error from "../ui/Error";

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
  });

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
      <>
        <div
          onClick={() => setIsmodalOpen(false)}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className=" bg-form-gradient rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                disabled={isLoading}
              >
                {isLoading ? "Submitting.." : "Submit Assignment"}
              </button>
            </div>

            {isError && error?.data && <Error message={error?.data} />}
          </form>
        </div>
      </>
    )
  );
};

export default AssignmentSubmitModal;
