import React, { useEffect, useState } from "react";
import TextInput from "../../ui/input/TextInput";
import TextArea from "../../ui/input/TextArea";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import Error from "../../ui/Error";
import {
  useAddAssignmentMutation,
  useGetAssignmentByIdQuery,
  useUpdateAssignmentMutation,
} from "../../../features/assignments/assignmentsApi";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentForm = ({ mode }) => {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  //input states
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [video, setVideo] = useState({});
  const [fetchAssignment, setFetchAssignment] = useState(false);
  //get videos for reference
  const { data: videos, isSuccess, isError, error } = useGetVideosQuery();

  //fetch assignnment by id
  const {
    data: assignment,
    isLoading: isAssignmentLoading,
    isSuccess: isAssignmentSuccess,
    isError: isAssignmentError,
  } = useGetAssignmentByIdQuery(assignmentId, {
    skip: !fetchAssignment,
  });

  //create assignment
  const [
    addAssignment,
    { isLoading: isAALoading, isSuccess: isAASuccess, isError: isAAError },
  ] = useAddAssignmentMutation();

  //update assignment
  const [
    updateAssignment,
    { isLoading: isUALoading, isSuccess: isUASuccess, isError: isUAError },
  ] = useUpdateAssignmentMutation();

  //set fetch
  useEffect(() => {
    if (mode == "edit" && assignmentId !== undefined) setFetchAssignment(true);
  }, [mode, assignmentId]);

  const currVideo = videos?.find((v) => v.id == assignment?.video_id);
  useEffect(() => {
    if (mode == "edit" && isAssignmentSuccess) {
      const { title, totalMark, video_id } = assignment;
      setTitle(title);
      setTotalMark(totalMark);
      setVideo(currVideo);
    }
  }, [currVideo, mode, isAssignmentSuccess]);

  const resetForm = () => {
    setTitle("");
    setTotalMark("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      totalMark,
      video_id: video?.id,
      video_title: video?.title,
    };

    if (mode == "create" && assignmentId == undefined) {
      addAssignment(data);
    }
    if (mode == "edit" && assignmentId) {
      updateAssignment({ data, assignmentId });
    }
  };

  useEffect(() => {
    if (isAASuccess || isUASuccess) navigate("/admin/assignment");
  }, [isAASuccess, isUASuccess]);

  if (mode == "edit" && isAssignmentLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="shadow overflow-hidden  sm:rounded-md">
        <div className="px-4 py-5 bg-primary sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Assignment Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="TotalMark"
                value={totalMark}
                onChange={(e) => setTotalMark(e.target.value)}
              />
            </div>

            <div className="col-span-12 lg:col-span-2">
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
              ? isAALoading
                ? "Adding..."
                : "Add"
              : isUALoading
              ? "Updating.."
              : "Update"}
          </button>
        </div>

        {/* {isSuccess && <Success message="Video was added successfully" />} */}
        {isError && <Error message="There was an error fetching videos!" />}
      </div>
    </form>
  );
};

export default AssignmentForm;
