import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import QuizQuestion from "../../components/quiz/QuizQuestion";
import QuizTitle from "../../components/quiz/QuizTitle";
import { useSubmitQuizMutation } from "../../features/quiz-mark/quizMarkApi";
import { useGetQuizzesByVideoIdQuery } from "../../features/quizzes/quizzesApi";
import useAuth from "../../hooks/useAuth";

const Quiz = () => {
  const { name: student_name, id: student_id } = useAuth();
  const { videoId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [index, setIndex] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [quizzesAns, setQuizzesAns] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  //submit quiz rtk api
  const [
    submitQuiz,
    {
      isLoading: isSubmitting,
      isSuccess: isSubmitted,
      isError: isSubmitError,
      error: submitError,
    },
  ] = useSubmitQuizMutation();

  // console.log(JSON.stringify(quizzesAns));

  const { data, isLoading, isSuccess } = useGetQuizzesByVideoIdQuery(videoId);

  //quiz title
  const title = data?.length > 0 && quizzes[0]?.video_title;

  //update local state with data
  useEffect(() => {
    if (isSuccess && data?.length > 0) {
      setQuizzes(data);
    }
  }, [isSuccess, data, videoId]);

  //catch current video
  useEffect(() => {
    setCurrentQuiz(quizzes[index]);
  }, [index, quizzes]);

  // handle move to next question
  const handleNextQiuz = (curr) => {
    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (isSubmitted) navigate(`/course-player/${videoId}`);
  }, [isSubmitting]);

  //handle submit quiz
  const handleSubmitQuiz = () => {
    const rightAnswer = quizzesAns.reduce((prev, curr) => {
      let isWrong = curr.options.find((e) => !e.isCorrect);

      if (isWrong) {
        return prev;
      } else {
        return prev + 1;
      }
    }, 0);
    const data = {
      student_id,
      student_name,
      video_id: videoId,
      video_title: title,
      totalQuiz: quizzes.length,
      totalWrong: quizzes.length - rightAnswer,
      totalMark: quizzes.length * 5,
      mark: rightAnswer * 5,
    };
    let confirm = window.confirm("Are you sure, you want to submit the quiz?");
    if (confirm) {
      submitQuiz(data);
    }
  };

  // handle select answer
  const handleSetQuizAns = (checked, quizId, selectedOption) => {
    if (quizzesAns.length > 0) {
      //copy old state
      const copiedAns = [...quizzesAns];

      if (checked) {
        //add option to quizzesAns
        // check is the quiz already exists or not
        const isQuiz = quizzesAns.findIndex((e) => e.id === quizId);
        if (isQuiz > -1) {
          //quiz found

          const updatedAnd = copiedAns.map((quiz) => {
            if (quiz.id === quizId) {
              // quiz already exist
              return {
                ...quiz,
                options: [...quiz.options, selectedOption],
              };
            }
            //quiz does not exist. so user selected his first option
            return quiz;
          });
          setQuizzesAns(updatedAnd);
        } else if (isQuiz < 0) {
          //set new answer with others
          setQuizzesAns([
            ...copiedAns,
            {
              id: quizId,
              options: [selectedOption],
            },
          ]);
        }
      } else {
        // remove option from quizzesAns
        const updatedAnd = copiedAns.map((quiz) => {
          const { options } = quiz;
          return {
            ...quiz,
            options: options?.filter((o) => o.id !== selectedOption.id),
          };
        });
        setQuizzesAns(updatedAnd);
      }
    } else {
      setQuizzesAns([
        {
          id: quizId,
          options: [selectedOption],
        },
      ]);
    }
  };

  //render jsx
  if (isLoading && !currentQuiz?.id) return <div className="">Loading...</div>;
  if (currentQuiz?.id && quizzes?.length > 0) {
    return (
      <>
        <section className="py-6 bg-primary">
          <div className="mx-auto max-w-7xl px-5 lg:px-0">
            <QuizTitle title={title} />
            <div className="space-y-8 ">
              <QuizQuestion
                quiz={currentQuiz}
                quizzesAns={quizzesAns}
                handleSetQuizAns={(checked, quizId, selectedOption) =>
                  handleSetQuizAns(checked, quizId, selectedOption)
                }
              />
            </div>

            <div className="flex justify-between">
              {index > 0 && index <= quizzes?.length - 1 && (
                <button
                  onClick={() => setIndex(index - 1)}
                  className="px-4  ml-0 py-2 rounded-full bg-cyan block  mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                >
                  Previous
                </button>
              )}
              {index < quizzes?.length - 1 ? (
                <button
                  onClick={() => handleNextQiuz(index)}
                  className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                >
                  next
                </button>
              ) : (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
                >
                  Submit
                </button>
              )}
            </div>
            {isSubmitError && submitError?.data && (
              <div>{submitError?.data}</div>
            )}
          </div>
        </section>
      </>
    );
  }
};

export default Quiz;
