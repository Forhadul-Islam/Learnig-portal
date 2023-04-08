import { useEffect, useState } from "react";
import TextInput from "../../ui/input/TextInput";
import TextArea from "../../ui/input/TextArea";
import {
  useAddVideoMutation,
  useGetVideoByIdQuery,
  useUpdateVideoMutation,
} from "../../../features/videos/videosApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../ui/Loader";

export default function Form({ mode }) {
  const { videoId } = useParams();
  const navigate = useNavigate();
  //input states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [duration, setDuration] = useState("");
  const [views, setViews] = useState("");
  const [fetchVideo, setFetchVideo] = useState(true);
  //get video by id
  const { data, isLoading, isSuccess, isError, error } = useGetVideoByIdQuery(
    videoId,
    {
      skip: fetchVideo,
    }
  );
  //add video
  const [
    addVideo,
    {
      isLoading: isAddVideoLoading,
      isSuccess: isAddVideoSuccess,
      isError: isAddVideoError,
      error: addVideoError,
    },
  ] = useAddVideoMutation();

  // update video by id
  const [
    updateVideo,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateVideoMutation();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setDuration("");
    setViews("");
  };

  //controle fetch video for edintign video
  useEffect(() => {
    if (videoId !== "undefined" && mode == "edit") {
      setFetchVideo(false);
    }
  }, [mode, videoId]);

  //full the states with current data
  useEffect(() => {
    if (videoId !== "undefined" && mode == "edit" && isSuccess && data?.id) {
      const { title, description, url, duration, views } = data;
      setTitle(title);
      setDescription(description);
      setLink(url);
      setDuration(duration);
      setViews(views);
    }
  }, [isSuccess]);

  const handleCreateVideo = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      url: link,
      duration,
      views,
      createdAt: new Date(),
    };
    if (mode == "create") {
      addVideo(data);
    }
    if (mode == "edit" && videoId) {
      updateVideo({ data, videoId });
    }
  };

  //redirect after update
  useEffect(() => {
    if (isAddVideoSuccess || isUpdateSuccess) {
      navigate("/admin/videos");
    }
  }, [isAddVideoSuccess, isUpdateSuccess]);

  //show loader when existing data fetching for edit video
  if (isLoading)
    return (
      <div className="flex justify-center  mt-10">
        <Loader />
      </div>
    );

  // show error when faild to fetch data to edit video
  if (isError)
    return (
      <div>
        {error?.data ? error?.data : "Something went wrong to fetch data!"}
      </div>
    );

  //show form for editing or creating new video
  return (
    <form onSubmit={handleCreateVideo}>
      <div className="bg-secondary mt-4 mx-4 shadow overflow-hidden  sm:rounded-md">
        <div className="px-4 py-5 bg-primary sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-12 ">
              <TextInput
                title="Video Title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-12">
              <TextArea
                title="Description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-span-12">
              <TextInput
                title="YouTube Video link"
                value={link}
                required
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                required
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                required
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-primary text-right sm:px-6">
          <button
            disabled={isAddVideoLoading || isUpdateLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            {mode == "create"
              ? isAddVideoLoading
                ? "Creating.."
                : "create"
              : isUpdateLoading
              ? "Updating"
              : "Update"}
          </button>
        </div>

        {/* {isSuccess && <Success message="Video was added successfully" />}
        {isError && <Error message="There was an error adding video!" />} */}
      </div>
    </form>
  );
}
