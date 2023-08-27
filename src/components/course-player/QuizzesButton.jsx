import React from "react";
import { Link } from "react-router-dom";
import { useGetQuizMarksByStudentAndVideoIdQuery } from "../../features/quiz-mark/quizMarkApi";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";

const QuizzesButton = ({ videoId }) => {
  const { user } = useSelector((state) => state.auth);

  //get quiz results
  const {
    data: quizAnswers,
    isSuccess: isQuizAns,
    isLoading: isQuizAnsLoading,
  } = useGetQuizMarksByStudentAndVideoIdQuery(
    {
      video_id: videoId,
      student_id: user?.id,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isQuizAns) {
    if (quizAnswers[0]?.id) {
      return (
        <button disabled className="px-3 font-bold py-1 outline_btn">
          কুইজ দিয়েছেন ! 👍
        </button>
      );
    } else {
      return (
        <Link
          to={`/quizzes/${videoId}`}
          className="px-3 font-md py-1 black_btn"
        >
          কুইজে অংশগ্রহণ করুন
        </Link>
      );
    }
  }
};

export default QuizzesButton;
