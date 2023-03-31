import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useGetAssignmentByVideoIdQuery } from "../../features/assignments/assignmentsApi";
import { useGetQuizzesByVideoIdQuery } from "../../features/quizzes/quizzesApi";
import AssignmentButton from "./AssignmentButton";
import QuizzesButton from "./QuizzesButton";

const VideoDetails = ({ video = {} }) => {
  const { id, title, description, createdAt } = video;

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight text-slate-100">
        {title}
      </h1>
      <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
        Uploaded on {moment(createdAt).fromNow()}
      </h2>

      <div className="flex gap-4">
        <AssignmentButton videoId={id} />

        <QuizzesButton videoId={id} />
      </div>
      <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
    </div>
  );
};

export default VideoDetails;
