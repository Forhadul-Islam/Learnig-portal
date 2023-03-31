import React from "react";
import { Link } from "react-router-dom";
import { useGetQuizMarksByStudentAndVideoIdQuery } from "../../features/quiz-mark/quizMarkApi";
import { useGetQuizzesByVideoIdQuery } from "../../features/quizzes/quizzesApi";
import useAuth from "../../hooks/useAuth";

const QuizzesButton = ({ videoId }) => {
  const user = useAuth();
  //fetch assignment
  const { data: quizzes, isSuccess } = useGetQuizzesByVideoIdQuery(videoId, {
    refetchOnMountOrArgChange: true,
  });

  //get quiz results
  const {
    data: quizAnswers,
    isSuccess: isQuizAns,
    isLoading: isQuizAnsLoading,
  } = useGetQuizMarksByStudentAndVideoIdQuery({
    video_id: videoId,
    student_id: user?.id,
  });

  if (isSuccess && isQuizAns && quizzes?.length > 0)
    if (quizAnswers[0]?.id) {
      return (
        <button
          disabled
          className="px-3 font-bold py-1 border border-red-400 text-red-400 rounded-full text-sm "
        >
          কুইজে দিয়েছেন !
        </button>
      );
    } else {
      return (
        <Link
          to={`/quizzes/${videoId}`}
          className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
        >
          কুইজে অংশগ্রহণ করুন
        </Link>
      );
    }
};

export default QuizzesButton;
