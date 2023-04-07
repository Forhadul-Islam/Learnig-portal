import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useGetAssignmentByVideoIdQuery } from "../../features/assignments/assignmentsApi";
import { useGetQuizzesByVideoIdQuery } from "../../features/quizzes/quizzesApi";
import QuizzesButton from "./QuizzesButton";
import AssignmentSubmitModal from "./AssignmentSubmitModal";
import AssignmentButton from "./AssignmentButton";
import { useGetAssignmentMarkByAssignmentIdAndStudentIdQuery } from "../../features/assignment-mark/assignmentMarkApi";
import useAuth from "../../hooks/useAuth";
import AssignmentMark from "./AssignmentMark";

const VideoDetails = ({ video = {} }) => {
  const user = useAuth();
  const { id, title, description, createdAt } = video;
  const [isModalOpen, setIsmodalOpen] = useState(false);

  //fetch assignment by video id
  const { data: assignment, isSuccess: isAssignmentSuccess } =
    useGetAssignmentByVideoIdQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  //fetch quizzes by video id
  const { data: quizzes, isSuccess: isQuizzesSuccess } =
    useGetQuizzesByVideoIdQuery(id, {
      refetchOnMountOrArgChange: true,
    });

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {moment(createdAt).fromNow()}
      </h2>

      <div className="flex gap-4">
        {isAssignmentSuccess && assignment?.length > 0 && (
          <>
            <AssignmentButton
              isModalOpen={isModalOpen}
              setIsmodalOpen={setIsmodalOpen}
              videoId={id}
              assignment={assignment[0]}
            />
            <AssignmentSubmitModal
              setIsmodalOpen={setIsmodalOpen}
              open={isModalOpen}
              assignment={assignment[0]}
              videoId={id}
            />
          </>
        )}
        {isQuizzesSuccess && quizzes?.[0]?.id && <QuizzesButton videoId={id} />}
      </div>
      {/* show assignment resutl state if submitted */}

      {isAssignmentSuccess && assignment?.length > 0 && (
        <AssignmentMark
          assignment_id={assignment?.[0]?.id}
          student_id={user?.id}
        />
      )}
      <div>
        <h4 className="mt-4">Description:</h4>
        <p className="mt-1 text-sm text-slate-400 leading-6">{description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
