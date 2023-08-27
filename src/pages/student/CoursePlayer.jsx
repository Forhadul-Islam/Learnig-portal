import React, { useEffect } from "react";
import Video from "../../components/course-player/Video";
import VideoList from "../../components/course-player/VideoList";
import Gradient from "../../components/ui/Gradient";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import { useNavigate, useParams } from "react-router-dom";

const CoursePlayer = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { data: videos, isFetching, isError, isSuccess } = useGetVideosQuery();

  useEffect(() => {
    if (!videoId) {
      if (isSuccess && videos?.length > 0) {
        let uri = `/course-player/${videos[0]?.id}`;
        navigate(uri);
      }
    }
  }, [videoId, isSuccess]);
  return (
    <>
      <Gradient />
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <Video />
            <VideoList />
          </div>
        </div>
      </section>
    </>
  );
};

export default CoursePlayer;
