import React from "react";
import { useGetAssignmentMarkByAssignmentIdAndStudentIdQuery } from "../../features/assignment-mark/assignmentMarkApi";

const AssignmentMark = ({ assignment_id, student_id }) => {
  //get assignment mark by ass_id and student_id
  const {
    data: assignmentMark,
    isSuccess,
    isLoading,
    isError,
  } = useGetAssignmentMarkByAssignmentIdAndStudentIdQuery(
    {
      assignment_id,
      student_id,
    },
    {
      // skip: !isAssignmentSuccess,
      refetchOnMountOrArgChange: true,
    }
  );
  if (isLoading) return null;
  if (isSuccess && assignmentMark?.length > 0) {
    return (
      <div className="mt-6 py-4 flex bg-opacity-10 border-t border-b border-gray-700">
        <ul className="border-2 bg-gray-90 border-indigo-600 px-2 text-white  rounded-full">
          <li className="py-1 flex justify-center items-center">
            <span className="text-black font-semibold">Assignment Mark -</span>
            <span className="bg-indigo-700 mx-2 rounded-full px-3">
              {assignmentMark[0]?.status == "published"
                ? assignmentMark[0]?.mark
                : "Pending"}
            </span>
          </li>
        </ul>
      </div>
    );
  }
  return null;
};

export default AssignmentMark;
