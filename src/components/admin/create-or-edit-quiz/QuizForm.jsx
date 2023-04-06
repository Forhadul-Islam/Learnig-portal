import React, { useEffect, useState } from "react";
import TextInput from "../../ui/input/TextInput";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import Error from "../../ui/Error";

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
  const [option1, setOption1] = useState({});
  const [option2, setOption2] = useState({});
  const [option3, setOption3] = useState({});
  const [option4, setOption4] = useState({});
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

  //get video
  function getVideo(videos, video_id) {
    return videos?.find((v) => v.id == video_id);
  }

  //set quiz data for editing
  useEffect(() => {
    if (mode == "edit" && isAssignmentSuccess) {
      const { id, question, video_id, options } = quiz;
      setQuestion(question);
      setVideo(currVideo);
      setOption1(option1[0]);
      setOption2(option2[1]);
      setOption3(option3[2]);
      setOption4(option4[3]);
      //   if (videos?.length > 0) {
      //     setVideo(getVideo(videos, video_id));
      //   }
    }
  }, [currVideo, mode, isQuizSuccess]);

  const resetForm = () => {
    setTitle("");
    setTotalMark("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      video_id: video?.id,
      video_title: video?.title,
    };

    if (mode == "create" && quizId == undefined) {
      //   addAssignment(data);
    }
    if (mode == "edit" && quizId) {
      //   updateAssignment({ data, quizId });
    }
  };

  useEffect(() => {
    if (isAQSuccess || isUQSuccess) navigate("/admin/quizzes");
  }, [isAQSuccess, isUQSuccess]);

  if (mode == "edit" && isQuizLoading) return <div>Loading...</div>;

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
            <div className="col-span-6 ">
              <TextInput
                title="Option-1"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
              />
            </div>
            {/* Option - 2 */}
            <div className="col-span-6 ">
              <TextInput
                title="Option-2"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
              />
            </div>
            {/* Option - 3 */}
            <div className="col-span-6 ">
              <TextInput
                title="Option-3"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
              />
            </div>
            {/* Option - 4 */}
            <div className="col-span-6 ">
              <TextInput
                title="Option-4"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
              />
            </div>
            <div className="col-span-12">
              <select
                className="mt-1 h-10 bg-gray-900 pl-2  block w-full shadow-sm sm:text-sm border border-gray-500  "
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
                      selected={v.id == video.id}
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
