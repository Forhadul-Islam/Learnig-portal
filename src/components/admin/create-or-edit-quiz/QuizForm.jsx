import React, { useEffect, useState } from "react";
import TextInput from "../../ui/input/TextInput";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import Error from "../../ui/Error";
import { TiTick } from "react-icons/ti";

import { useNavigate, useParams } from "react-router-dom";
import {
  useAddQuizMutation,
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../../features/quizzes/quizzesApi";

const QuizForm = ({ mode }) => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  //input states
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState({
    id: 1,
    option: "",
    isCorrect: false,
  });
  const [option2, setOption2] = useState({
    id: 2,
    option: "",
    isCorrect: false,
  });
  const [option3, setOption3] = useState({
    id: 3,
    option: "",
    isCorrect: false,
  });
  const [option4, setOption4] = useState({
    id: 4,
    option: "",
    isCorrect: false,
  });
  const [ansId, setAnsId] = useState(1);
  const [video, setVideo] = useState({});
  const [fetchQuiz, setFetchQuiz] = useState(false);
  //get videos for reference
  const { data: videos, isSuccess, isError, error } = useGetVideosQuery();

  //fetch assignnment by id
  const {
    data: quiz,
    isLoading: isQuizLoading,
    isSuccess: isQuizSuccess,
    isError: isQuizError,
  } = useGetQuizByIdQuery(quizId, {
    skip: !fetchQuiz,
  });

  //add new quiz
  const [
    addQuiz,
    {
      isSuccess: isAQSuccess,
      isLoading: isAQLoading,
      isError: isAQError,
      error: AQError,
    },
  ] = useAddQuizMutation();

  //update a quiz
  const [
    updateQuiz,
    {
      isLoading: isUQLoading,
      isSuccess: isUQSuccess,
      isError: isUQError,
      error: UQError,
    },
  ] = useUpdateQuizMutation();

  //set fetch
  useEffect(() => {
    if (mode == "edit" && quizId !== undefined) setFetchQuiz(true);
  }, [mode, quizId]);

  const currVideo = videos?.find((v) => v.id == quiz?.video_id);
  const correctOptionId = quiz?.options.find((op) => {
    return op.isCorrect;
  }).id;

  //get video
  function getVideo(videos, video_id) {
    return videos?.find((v) => v.id == video_id);
  }

  //set quiz data for editing
  useEffect(() => {
    if (mode == "edit" && isQuizSuccess) {
      const { id, question, video_id, options } = quiz;
      setQuestion(question);
      setVideo(currVideo);
      setOption1(options[0]);
      setOption2(options[1]);
      setOption3(options[2]);
      setOption4(options[3]);
      setAnsId(correctOptionId);
      //   if (videos?.length > 0) {
      //     setVideo(getVideo(videos, video_id));
      //   }
    }
  }, [currVideo, mode, quiz, isQuizSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const optionsCopy = [option1, option2, option3, option4];
    const updatedOptionsWithCorrectAsn = optionsCopy.map((op) => {
      if (op.id === ansId) {
        return {
          ...op,
          isCorrect: true,
        };
      }
      return {
        ...op,
        isCorrect: false,
      };
    });
    const data = {
      question,
      options: updatedOptionsWithCorrectAsn,
      video_id: video?.id,
      video_title: video?.title,
    };

    if (mode == "create" && quizId == undefined) {
      addQuiz(data);
    }
    if (mode == "edit" && quizId) {
      updateQuiz({ data, quizId });
    }
  };

  //handle options input
  const handleOptions = ({ setter, option, field, value }) => {
    setter({
      ...option,
      [field]: value,
    });
  };

  useEffect(() => {
    if (isAQSuccess || isUQSuccess) navigate("/admin/quizzes");
  }, [isAQSuccess, isUQSuccess]);

  if (mode == "edit" && isQuizLoading) return <div>Loading...</div>;

  //css for checked option answer
  const getCheckedTickCss = (optionId, ansId) => {
    return `${
      optionId == ansId ? "text-green-500" : "text-gray-500"
    } cursor-pointer w-16 -mb-4  flex justify-center items-center`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden  sm:rounded-md">
        <div className="px-4 py-5 bg-primary sm:p-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 ">
              <TextInput
                title="Quiz Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            {/* Option - 1 */}
            <div className=" col-span-6 flex bg-gray-800 py-2 px-2 rounded-md">
              <div className="flex-1">
                <TextInput
                  title="Option-1"
                  value={option1?.option}
                  onChange={(e) =>
                    handleOptions({
                      setter: setOption1,
                      field: "option",
                      option: option1,
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div
                onClick={() => setAnsId(option1.id)}
                className={getCheckedTickCss(option1?.id, ansId)}
              >
                <TiTick className="text-5xl" />
              </div>
            </div>
            {/* Option - 2 */}
            <div className=" col-span-6 flex bg-gray-800 py-2 px-2 rounded-md">
              <div className="flex-1">
                <TextInput
                  title="Option-2"
                  value={option2?.option}
                  onChange={(e) =>
                    handleOptions({
                      setter: setOption2,
                      field: "option",
                      option: option2,
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div
                onClick={() => setAnsId(option2.id)}
                className={getCheckedTickCss(option2?.id, ansId)}
              >
                <TiTick className="text-5xl" />
              </div>
            </div>
            {/* Option - 3 */}
            <div className=" col-span-6 flex bg-gray-800 py-2 px-2 rounded-md">
              <div className="flex-1">
                <TextInput
                  title="Option-3"
                  value={option3?.option}
                  onChange={(e) =>
                    handleOptions({
                      setter: setOption3,
                      field: "option",
                      option: option3,
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div
                onClick={() => setAnsId(option3.id)}
                className={getCheckedTickCss(option3?.id, ansId)}
              >
                <TiTick className="text-5xl" />
              </div>
            </div>
            {/* Option - 4 */}
            <div className=" col-span-6 flex bg-gray-800 py-2 px-2 rounded-md">
              <div className="flex-1">
                <TextInput
                  title="Option-4"
                  value={option4?.option}
                  onChange={(e) =>
                    handleOptions({
                      setter: setOption4,
                      field: "option",
                      option: option4,
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div
                onClick={() => setAnsId(option4.id)}
                className={getCheckedTickCss(option4?.id, ansId)}
              >
                <TiTick className="text-5xl" />
              </div>
            </div>
            <div className="col-span-12">
              <select
                className="mt-1 h-12  bg-gray-900 pl-2  block w-full shadow-sm sm:text-sm border border-gray-500  "
                title="Video no of views"
                defaultValue={video?.title}
                onChange={(e) => setVideo(JSON.parse(e.target.value))}
              >
                {mode == "create" && (
                  <option value="" hidden>
                    Select Video
                  </option>
                )}
                {isSuccess &&
                  videos?.length > 0 &&
                  videos.map((v) => (
                    <option
                      className="h-10 py-2 "
                      selected={v.id == video?.id}
                      value={JSON.stringify(v)}
                    >
                      {v.title}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-primary text-right sm:px-6">
          <button
            // disabled={true}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            {mode == "create"
              ? isAQLoading
                ? "Adding..."
                : "Add"
              : isUQLoading
              ? "Updating..."
              : "Update"}
          </button>
        </div>

        {/* {isSuccess && <Success message="Video was added successfully" />} */}
        {isError ||
          isAQError ||
          (isUQError && <Error message="There was an error" />)}
      </div>
    </form>
  );
};

export default QuizForm;
