import React from "react";
import { Link } from "react-router-dom";
import { useGetAssignmentMarkByAssignmentIdAndStudentIdQuery } from "../../features/assignment-mark/assignmentMarkApi";
import useAuth from "../../hooks/useAuth";

const AssignmentButton = ({
  videoId,
  setIsmodalOpen,
  isModalOpen,
  assignment,
}) => {
  const user = useAuth();

  //get the assignment for video_id and student_id
  const { data: assignmentMark, isSuccess: isAssignmentMarkSuccess } =
    useGetAssignmentMarkByAssignmentIdAndStudentIdQuery({
      assignment_id: assignment?.id,
      student_id: user?.id,
    });

  if (isAssignmentMarkSuccess) {
    if (assignmentMark?.[0]?.id) {
      return (
        <button
          onClick={() => setIsmodalOpen(!isModalOpen)}
          disabled
          className="px-3 font-bold py-1   outline_only_btn"
        >
          এসাইনমেন্ট দিয়েছেন !
        </button>
      );
    } else {
      return (
        <button
          onClick={() => setIsmodalOpen(!isModalOpen)}
          className="px-3 font-md py-1 black_btn"
        >
          📑 এসাইনমেন্ট
        </button>
      );
    }
  }
};

export default AssignmentButton;
