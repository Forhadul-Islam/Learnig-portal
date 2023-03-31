import React from "react";
import { useParams } from "react-router-dom";
import { useGetVideoByIdQuery } from "../../features/videos/videosApi";
import NotFound from "../ui/NotFound";
import DescriptionSkeleton from "../ui/skeleton/DescriptionSkeleton";
import VideoSkeleton from "../ui/skeleton/VideoSkeleton";
import AssignmentSubmitModal from "./AssignmentSubmitModal";
import Player from "./Player";
import VideoDetails from "./VideoDetails";

const Video = () => {
  const { videoId } = useParams();
  const {
    data: video,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetVideoByIdQuery(videoId, {
    refetchOnMountOrArgChange: true,
  });

  //decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div>
        <VideoSkeleton />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <NotFound />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <div>
        <Player video={video} />
        <VideoDetails video={video} />
        <AssignmentSubmitModal />
      </div>
    );
  }

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {content}
    </div>
  );
};

export default Video;
